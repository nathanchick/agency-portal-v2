<?php

namespace Modules\Timesheet\Services;

use Carbon\Carbon;
use Modules\Timesheet\Models\TimeEntry;

class CustomerReportService
{
    public function generateReport(array $filters, string $serviceId): array
    {
        $dateRange = $this->calculateDateRange($filters);

        $query = TimeEntry::where('service_id', $serviceId)
            ->with(['user', 'customer', 'service', 'task'])
            ->whereBetween('date', [$dateRange['start'], $dateRange['end']]);

        $timeEntries = $query->orderBy('date', 'desc')->get();

        return [
            'time_entries' => $timeEntries,
            'summary' => $this->calculateSummary($timeEntries),
            'filters' => $this->getAppliedFilters($filters),
        ];
    }

    public function exportToCsv(array $filters, string $serviceId): string
    {
        $data = $this->generateReport($filters, $serviceId);
        $timeEntries = $data['time_entries'];

        $csvData = [];
        $csvData[] = [
            'Date',
            'Team Member',
            'Task',
            'Description',
            'Hours',
            'Billable',
            'Rate',
            'Amount',
            'External Service',
            'External ID',
        ];

        foreach ($timeEntries as $entry) {
            $externalRef = $entry->external_reference ? json_decode($entry->external_reference, true) : null;

            $csvData[] = [
                $entry->date->format('Y-m-d'),
                $entry->user->name ?? '',
                $entry->task->name ?? '',
                $entry->description ?? '',
                number_format($entry->duration_hours, 2),
                $entry->billable ? 'Yes' : 'No',
                number_format($entry->hourly_rate, 2),
                number_format($entry->duration_hours * $entry->hourly_rate, 2),
                $externalRef['service'] ?? '',
                $externalRef['id'] ?? '',
            ];
        }

        $output = fopen('php://temp', 'r+');
        foreach ($csvData as $row) {
            fputcsv($output, $row);
        }
        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
    }

    protected function calculateDateRange(array $filters): array
    {
        $now = Carbon::now();

        return match ($filters['time_frame']) {
            'this_month' => ['start' => $now->copy()->startOfMonth(), 'end' => $now->copy()->endOfMonth()],
            'last_month' => ['start' => $now->copy()->subMonth()->startOfMonth(), 'end' => $now->copy()->subMonth()->endOfMonth()],
            'this_year' => ['start' => $now->copy()->startOfYear(), 'end' => $now->copy()->endOfYear()],
            'last_year' => ['start' => $now->copy()->subYear()->startOfYear(), 'end' => $now->copy()->subYear()->endOfYear()],
            'custom' => ['start' => Carbon::parse($filters['start_date']), 'end' => Carbon::parse($filters['end_date'])],
            default => ['start' => $now->copy()->startOfMonth(), 'end' => $now->copy()->endOfMonth()],
        };
    }

    protected function calculateSummary($timeEntries): array
    {
        $totalHours = 0;
        $billableHours = 0;
        $totalAmount = 0;

        foreach ($timeEntries as $entry) {
            $totalHours += $entry->duration_hours;
            if ($entry->billable) {
                $billableHours += $entry->duration_hours;
            }
            $totalAmount += $entry->duration_hours * $entry->hourly_rate;
        }

        return [
            'total_hours' => round($totalHours, 2),
            'billable_hours' => round($billableHours, 2),
            'non_billable_hours' => round($totalHours - $billableHours, 2),
            'total_amount' => round($totalAmount, 2),
            'entry_count' => $timeEntries->count(),
        ];
    }

    protected function getAppliedFilters(array $filters): array
    {
        $dateRange = $this->calculateDateRange($filters);

        return [
            'applied_time_frame' => $filters['time_frame'] ?? null,
            'start_date' => $dateRange['start'] ?? null,
            'end_date' => $dateRange['end'] ?? null,
        ];
    }
}
