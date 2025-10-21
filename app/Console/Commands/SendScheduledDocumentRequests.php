<?php

namespace App\Console\Commands;

use App\Models\DocumentHistory;
use App\Models\DocumentRequest;
use App\Notifications\DocumentRequestNotification;
use Illuminate\Console\Command;

class SendScheduledDocumentRequests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'documents:send-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send scheduled document requests that are due';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for scheduled document requests...');

        // Get all document requests that are scheduled to be sent now or in the past
        $documentRequests = DocumentRequest::with(['user', 'document', 'organisation'])
            ->where('status', 'not_sent')
            ->whereNotNull('scheduled_send_at')
            ->where('scheduled_send_at', '<=', now())
            ->get();

        if ($documentRequests->isEmpty()) {
            $this->info('No scheduled document requests found.');
            return 0;
        }

        $this->info("Found {$documentRequests->count()} document request(s) to send.");

        $sent = 0;
        $failed = 0;

        foreach ($documentRequests as $documentRequest) {
            try {
                $this->sendDocumentRequest($documentRequest);

                // Update status to processing
                $documentRequest->update(['status' => 'processing']);

                $sent++;
                $this->info("Sent document request #{$documentRequest->id}");
            } catch (\Exception $e) {
                $failed++;
                $this->error("Failed to send document request #{$documentRequest->id}: {$e->getMessage()}");
            }
        }

        $this->info("Completed: {$sent} sent, {$failed} failed.");
        return 0;
    }

    /**
     * Send document request email to user and CC
     */
    protected function sendDocumentRequest(DocumentRequest $documentRequest)
    {
        $requiresSignature = $documentRequest->requires_approval;

        // Send to primary user
        if ($documentRequest->user && $documentRequest->user->email) {
            $documentRequest->user->notify(new DocumentRequestNotification($documentRequest, $requiresSignature));

            // Log the send action to history
            DocumentHistory::create([
                'document_request_id' => $documentRequest->id,
                'action' => 'sent',
                'user_id' => $documentRequest->user_id,
                'user_name' => $documentRequest->user->name,
                'user_email' => $documentRequest->user->email,
                'ip_address' => null,
                'user_agent' => 'Scheduled Task',
                'meta_data' => [
                    'sent_by' => null,
                    'recipient_type' => 'primary',
                    'scheduled_send' => true,
                ],
            ]);
        }

        // Send to CC if provided
        if ($documentRequest->cc_email) {
            \Notification::route('mail', [
                $documentRequest->cc_email => $documentRequest->cc_name
            ])->notify(new DocumentRequestNotification($documentRequest, $requiresSignature));

            // Log the CC send action to history
            DocumentHistory::create([
                'document_request_id' => $documentRequest->id,
                'action' => 'sent',
                'user_id' => null,
                'user_name' => $documentRequest->cc_name,
                'user_email' => $documentRequest->cc_email,
                'ip_address' => null,
                'user_agent' => 'Scheduled Task',
                'meta_data' => [
                    'sent_by' => null,
                    'recipient_type' => 'cc',
                    'scheduled_send' => true,
                ],
            ]);
        }
    }
}
