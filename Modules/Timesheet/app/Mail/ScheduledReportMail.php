<?php

namespace Modules\Timesheet\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Modules\Timesheet\Models\SavedTimesheetReport;

class ScheduledReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public SavedTimesheetReport $savedReport;
    public array $reportData;
    public string $fileContent;
    public string $fileName;
    public string $mimeType;

    /**
     * Create a new message instance.
     */
    public function __construct(
        SavedTimesheetReport $savedReport,
        array $reportData,
        string $fileContent,
        string $fileName,
        string $mimeType
    ) {
        $this->savedReport = $savedReport;
        $this->reportData = $reportData;
        $this->fileContent = $fileContent;
        $this->fileName = $fileName;
        $this->mimeType = $mimeType;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Scheduled Timesheet Report: {$this->savedReport->name}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'timesheet::emails.scheduled-report',
            with: [
                'reportName' => $this->savedReport->name,
                'reportDescription' => $this->savedReport->description,
                'summary' => $this->reportData['summary'],
                'filters' => $this->reportData['filters'],
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->fileContent, $this->fileName)
                ->withMime($this->mimeType),
        ];
    }
}
