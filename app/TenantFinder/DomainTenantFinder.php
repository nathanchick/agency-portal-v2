<?php

namespace App\TenantFinder;

use Modules\Organisation\Models\Organisation;
use Illuminate\Http\Request;
use Spatie\Multitenancy\TenantFinder\TenantFinder;

class DomainTenantFinder extends TenantFinder
{
    public function findForRequest(Request $request): ?Organisation
    {
        // Try to get tenant from subdomain (e.g., tenant1.yourapp.com)
        $host = $request->getHost();

        // Extract subdomain
        $parts = explode('.', $host);

        // If localhost or single domain, try to get from user's session/auth
        if (count($parts) < 3 || in_array($host, ['localhost', '127.0.0.1'])) {
            return $this->findFromAuthenticatedUser($request);
        }

        $subdomain = $parts[0];

        // Find organisation by subdomain (you'll need to add a subdomain column)
        // For now, we'll use name as a fallback
        return Organisation::where('name', $subdomain)->first();
    }

    protected function findFromAuthenticatedUser(Request $request): ?Organisation
    {
        $user = $request->user();

        if (!$user) {
            if (config('app.debug')) {
                \Log::debug('DomainTenantFinder - No authenticated user');
            }
            return null;
        }

        // Get the first organisation the user belongs to
        // You might want to store the current_organisation_id on the user
        $organisation = $user->organisations()->first();

        if (config('app.debug')) {
            \Log::debug('DomainTenantFinder - Found organisation', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'organisation_id' => $organisation?->id,
                'organisation_name' => $organisation?->name,
            ]);
        }

        return $organisation;
    }
}
