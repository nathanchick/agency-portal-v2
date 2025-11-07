<?php

namespace Modules\Timesheet\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetPeriod;
use Modules\Timesheet\Models\TimeEntry;

class ReportService
{
    /**
     * Generate report data based on filters
     */
    public function generateReport(array $filters, string $organisationId): array
    {
        $query = $this->buildQuery($filters, $organisationId);

        $timeEntries = $query->with([
            'user:id,name,email',
            'customer:id,name',
            'service:id,name',
            'task:id,name',
        ])->get();

        $summary = $this->calculateSummary($timeEntries);

        return [
            'time_entries' => $timeEntries,
            'summary' => $summary,
            'filters' => $this->getAppliedFilters($filters, $organisationId),
        ];
    }

    /**
     * Build query with all filters applied
     */
    public function buildQuery(array $filters, string $organisationId): Builder
    {
        $query = TimeEntry::query()->where('organisation_id', $organisationId);

        // Apply date range
        $dateRange = $this->calculateDateRange($filters);
        if ($dateRange) {
            $query->whereBetween('date', [$dateRange['start'], $dateRange['end']]);
        }

        // Apply customer filter
        if (!empty($filters['customer_ids'])) {
            $query->whereIn('customer_id', $filters['customer_ids']);
        }

        // Apply service filter
        if (!empty($filters['service_ids'])) {
            $query->whereIn('service_id', $filters['service_ids']);
        }

        // Apply task filter
        if (!empty($filters['task_ids'])) {
            $query->whereIn('task_id', $filters['task_ids']);
        }

        // Apply user/team filter
        if (!empty($filters['user_ids'])) {
            $query->whereIn('user_id', $filters['user_ids']);
        }

        // Order by date descending
        $query->orderBy('date', 'desc')->orderBy('created_at', 'desc');

        return $query;
    }

    /**
     * Calculate date range based on time_frame
     */
    protected function calculateDateRange(array $filters): ?array
    {
        $timeFrame = $filters['time_frame'] ?? null;

        if (!$timeFrame) {
            return null;
        }

        $start = null;
        $end = null;

        switch ($timeFrame) {
            case 'current_period':
                return $this->getBudgetPeriodRange($filters['service_id_for_period'] ?? null, true);

            case 'last_period':
                return $this->getBudgetPeriodRange($filters['service_id_for_period'] ?? null, false);

            case 'this_month':
                $start = now()->startOfMonth();
                $end = now()->endOfMonth();
                break;

            case 'last_month':
                $start = now()->subMonth()->startOfMonth();
                $end = now()->subMonth()->endOfMonth();
                break;

            case 'this_year':
                $start = now()->startOfYear();
                $end = now()->endOfYear();
                break;

            case 'last_year':
                $start = now()->subYear()->startOfYear();
                $end = now()->subYear()->endOfYear();
                break;

            case 'custom':
                if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
                    $start = \Carbon\Carbon::parse($filters['start_date']);
                    $end = \Carbon\Carbon::parse($filters['end_date']);
                }
                break;
        }

        if ($start && $end) {
            return [
                'start' => $start->format('Y-m-d'),
                'end' => $end->format('Y-m-d'),
            ];
        }

        return null;
    }

    /**
     * Get budget period date range
     */
    protected function getBudgetPeriodRange(?string $serviceId, bool $current = true): ?array
    {
        if (!$serviceId) {
            return null;
        }

        $service = Service::find($serviceId);
        if (!$service) {
            return null;
        }

        $query = ServiceBudgetPeriod::where('service_id', $serviceId)
            ->orderBy('period_start', 'desc');

        if ($current) {
            // Get current period
            $period = $query->where('period_start', '<=', now())
                ->where('period_end', '>=', now())
                ->first();
        } else {
            // Get last completed period
            $period = $query->where('period_end', '<', now())
                ->first();
        }

        if ($period) {
            return [
                'start' => $period->period_start->format('Y-m-d'),
                'end' => $period->period_end->format('Y-m-d'),
            ];
        }

        return null;
    }

    /**
     * Calculate summary statistics
     */
    protected function calculateSummary(Collection $timeEntries): array
    {
        $totalHours = $timeEntries->sum('duration_hours');
        $billableHours = $timeEntries->where('billable', true)->sum('duration_hours');
        $nonBillableHours = $timeEntries->where('billable', false)->sum('duration_hours');
        $totalAmount = $timeEntries->sum(function ($entry) {
            return $entry->duration_hours * $entry->hourly_rate;
        });

        return [
            'total_hours' => round($totalHours, 2),
            'billable_hours' => round($billableHours, 2),
            'non_billable_hours' => round($nonBillableHours, 2),
            'total_amount' => round($totalAmount, 2),
            'entry_count' => $timeEntries->count(),
        ];
    }

    /**
     * Get applied filters with labels
     */
    protected function getAppliedFilters(array $filters, string $organisationId): array
    {
        $dateRange = $this->calculateDateRange($filters);

        return [
            'applied_time_frame' => $filters['time_frame'] ?? null,
            'start_date' => $dateRange['start'] ?? null,
            'end_date' => $dateRange['end'] ?? null,
            'customer_ids' => $filters['customer_ids'] ?? [],
            'service_ids' => $filters['service_ids'] ?? [],
            'task_ids' => $filters['task_ids'] ?? [],
            'user_ids' => $filters['user_ids'] ?? [],
        ];
    }

    /**
     * Export report to CSV
     */
    public function exportToCsv(array $filters, string $organisationId): string
    {
        $data = $this->generateReport($filters, $organisationId);
        $timeEntries = $data['time_entries'];

        $csvData = [];
        $csvData[] = [
            'Date',
            'User',
            'Customer',
            'Service',
            'Task',
            'Description',
            'Hours',
            'Billable',
            'Hourly Rate',
            'Total Amount',
            'Approved',
            'External Service',
            'External ID',
        ];

        foreach ($timeEntries as $entry) {
            $externalRef = $entry->external_reference ? json_decode($entry->external_reference, true) : null;

            $csvData[] = [
                $entry->date->format('Y-m-d'),
                $entry->user->name ?? '',
                $entry->customer->name ?? '',
                $entry->service->name ?? '',
                $entry->task->name ?? '',
                $entry->description ?? '',
                number_format($entry->duration_hours, 2),
                $entry->billable ? 'Yes' : 'No',
                number_format($entry->hourly_rate, 2),
                number_format($entry->duration_hours * $entry->hourly_rate, 2),
                $entry->approved ? 'Yes' : 'No',
                $externalRef['service'] ?? '',
                $externalRef['id'] ?? '',
            ];
        }

        // Add summary rows
        $csvData[] = [];
        $csvData[] = ['Summary'];
        $csvData[] = ['Total Hours', number_format($data['summary']['total_hours'], 2)];
        $csvData[] = ['Billable Hours', number_format($data['summary']['billable_hours'], 2)];
        $csvData[] = ['Non-Billable Hours', number_format($data['summary']['non_billable_hours'], 2)];
        $csvData[] = ['Total Amount', number_format($data['summary']['total_amount'], 2)];
        $csvData[] = ['Total Entries', $data['summary']['entry_count']];

        // Convert to CSV string
        $output = fopen('php://temp', 'r+');
        foreach ($csvData as $row) {
            fputcsv($output, $row);
        }
        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
    }

    /**
     * Get filename for export
     */
    public function getExportFilename(array $filters): string
    {
        $timeFrame = $filters['time_frame'] ?? 'custom';
        $date = now()->format('Y-m-d');

        return "timesheet-report-{$timeFrame}-{$date}";
    }
}
