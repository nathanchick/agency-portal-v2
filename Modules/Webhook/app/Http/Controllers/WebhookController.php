<?php

namespace Modules\Webhook\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Modules\Webhook\Models\Webhook;

class WebhookController extends Controller
{
    protected function getCurrentOrganisationId()
    {
        // IMPORTANT: Refresh user to get latest database values
        $user = auth()->user();
        $user->refresh();

        return $user->last_organisation_id ?? $user->organisations()->first()?->id;
    }

    /**
     * Display a listing of webhooks
     */
    public function index(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        if (! $organisationId) {
            abort(403, 'No organisation selected');
        }

        $query = Webhook::where('organisation_id', $organisationId)
            ->latest();

        // Filter by active status
        if ($request->filled('status')) {
            $query->where('active', $request->status === 'active');
        }

        // Search by name or URL
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('url', 'like', '%'.$request->search.'%');
            });
        }

        $webhooks = $query->paginate(15)->withQueryString();

        return Inertia::render('webhooks/index', [
            'webhooks' => $webhooks,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Display webhook jobs (pending, failed, completed)
     */
    public function jobs(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        if (! $organisationId) {
            abort(403, 'No organisation selected');
        }

        // Get jobs from the jobs table (pending/processing)
        $pendingJobs = DB::table('jobs')
            ->where('queue', 'webhooks')
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get()
            ->map(function ($job) {
                $payload = json_decode($job->payload, true);
                $data = unserialize($payload['data']['command'] ?? '');

                return [
                    'id' => $job->id,
                    'status' => 'pending',
                    'queue' => $job->queue,
                    'attempts' => $job->attempts,
                    'created_at' => date('Y-m-d H:i:s', $job->created_at),
                    'webhook_id' => $data->webhook->id ?? null,
                    'webhook_name' => $data->webhook->name ?? null,
                    'event' => $data->event ?? null,
                    'url' => $data->webhook->url ?? null,
                ];
            });

        // Get failed jobs
        $failedJobs = DB::table('failed_jobs')
            ->where('queue', 'webhooks')
            ->orderBy('failed_at', 'desc')
            ->limit(50)
            ->get()
            ->map(function ($job) {
                $payload = json_decode($job->payload, true);
                $data = unserialize($payload['data']['command'] ?? '');

                return [
                    'id' => $job->id,
                    'uuid' => $job->uuid,
                    'status' => 'failed',
                    'queue' => $job->queue,
                    'exception' => substr($job->exception, 0, 200).'...',
                    'failed_at' => $job->failed_at,
                    'webhook_id' => $data->webhook->id ?? null,
                    'webhook_name' => $data->webhook->name ?? null,
                    'event' => $data->event ?? null,
                    'url' => $data->webhook->url ?? null,
                ];
            });

        // Combine and sort by timestamp
        $allJobs = $pendingJobs->concat($failedJobs)
            ->sortByDesc(function ($job) {
                return $job['failed_at'] ?? $job['created_at'];
            })
            ->values()
            ->take(100);

        return Inertia::render('webhooks/jobs', [
            'jobs' => $allJobs,
        ]);
    }

    /**
     * Show the form for creating a new webhook
     */
    public function create()
    {
        return Inertia::render('webhooks/create', [
            'availableModels' => Webhook::getAvailableModels(),
            'availableEvents' => Webhook::getAvailableEvents(),
        ]);
    }

    /**
     * Store a newly created webhook
     */
    public function store(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        if (! $organisationId) {
            abort(403, 'No organisation selected');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'model' => 'required|string',
            'events' => 'required|array|min:1',
            'events.*' => 'in:created,updated,deleted',
            'secret' => 'nullable|string|max:255',
            'active' => 'boolean',
            'headers' => 'nullable|array',
        ]);

        // Generate secret if not provided
        if (empty($validated['secret'])) {
            $validated['secret'] = Str::random(32);
        }

        $validated['organisation_id'] = $organisationId;

        Webhook::create($validated);

        return redirect()->route('webhooks.index')->with('success', 'Webhook created successfully');
    }

    /**
     * Show the form for editing a webhook
     */
    public function edit(Webhook $webhook)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure webhook belongs to current organisation
        if ($webhook->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this webhook');
        }

        return Inertia::render('webhooks/edit', [
            'webhook' => $webhook,
            'availableModels' => Webhook::getAvailableModels(),
            'availableEvents' => Webhook::getAvailableEvents(),
        ]);
    }

    /**
     * Update a webhook
     */
    public function update(Request $request, Webhook $webhook)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure webhook belongs to current organisation
        if ($webhook->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this webhook');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'model' => 'required|string',
            'events' => 'required|array|min:1',
            'events.*' => 'in:created,updated,deleted',
            'secret' => 'nullable|string|max:255',
            'active' => 'boolean',
            'headers' => 'nullable|array',
        ]);

        $webhook->update($validated);

        return redirect()->route('webhooks.index')->with('success', 'Webhook updated successfully');
    }

    /**
     * Remove a webhook
     */
    public function destroy(Webhook $webhook)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure webhook belongs to current organisation
        if ($webhook->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this webhook');
        }

        $webhook->delete();

        return redirect()->route('webhooks.index')->with('success', 'Webhook deleted successfully');
    }

    /**
     * Toggle webhook active status
     */
    public function toggle(Webhook $webhook)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure webhook belongs to current organisation
        if ($webhook->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this webhook');
        }

        $webhook->update(['active' => ! $webhook->active]);

        return back()->with('success', 'Webhook status updated successfully');
    }

    /**
     * Regenerate webhook secret
     */
    public function regenerateSecret(Webhook $webhook)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure webhook belongs to current organisation
        if ($webhook->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this webhook');
        }

        $webhook->update(['secret' => Str::random(32)]);

        return back()->with('success', 'Webhook secret regenerated successfully');
    }
}
