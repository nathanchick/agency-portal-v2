<?php

namespace Modules\Timesheet\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Modules\Timesheet\Mail\ScheduledReportMail;
use Modules\Timesheet\Models\ScheduledTimesheetReport;
use Modules\Timesheet\Services\ReportService;

class SendScheduledReports extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'timesheet:send-scheduled-reports';

    /**
     * The console command description.
     */
    protected $description = 'Send scheduled timesheet reports to recipients';

    protected ReportService $reportService;

    /**
     * Create a new command instance.
     */
    public function __construct(ReportService $reportService)
    {
        parent::__construct();
        $this->reportService = $reportService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for scheduled reports to send...');

        $scheduledReports = ScheduledTimesheetReport::dueToRun()
            ->with(['savedReport', 'createdBy'])
            ->get();

        if ($scheduledReports->isEmpty()) {
            $this->info('No scheduled reports due to run.');
            return 0;
        }

        $this->info("Found {$scheduledReports->count()} scheduled reports to send.");

        $sent = 0;
        $failed = 0;

        foreach ($scheduledReports as $scheduledReport) {
            try {
                $this->sendReport($scheduledReport);
                $sent++;
                $this->info("✓ Sent report: {$scheduledReport->savedReport->name}");
            } catch (\Exception $e) {
                $failed++;
                $this->error("✗ Failed to send report: {$scheduledReport->savedReport->name}");
                $this->error("  Error: {$e->getMessage()}");
            }
        }

        $this->info("\nSummary:");
        $this->info("  Sent: {$sent}");
        $this->info("  Failed: {$failed}");

        return 0;
    }

    /**
     * Send a scheduled report
     */
    protected function sendReport(ScheduledTimesheetReport $scheduledReport)
    {
        $savedReport = $scheduledReport->savedReport;
        $filters = $savedReport->filters;

        // Generate report data
        $reportData = $this->reportService->generateReport(
            $filters,
            $scheduledReport->organisation_id
        );

        // Generate export file
        $fileContent = null;
        $fileName = null;
        $mimeType = null;

        if ($scheduledReport->format === 'csv') {
            $fileContent = $this->reportService->exportToCsv(
                $filters,
                $scheduledReport->organisation_id
            );
            $fileName = $this->reportService->getExportFilename($filters) . '.csv';
            $mimeType = 'text/csv';
        } elseif ($scheduledReport->format === 'pdf') {
            // PDF export would go here in the future
            throw new \Exception('PDF export not yet implemented');
        }

        // Send email to each recipient
        foreach ($scheduledReport->recipients as $recipient) {
            Mail::to($recipient)->send(new ScheduledReportMail(
                $savedReport,
                $reportData,
                $fileContent,
                $fileName,
                $mimeType
            ));
        }

        // Mark as sent and calculate next run time
        $scheduledReport->markAsSent();
    }
}
