<?php

namespace Modules\PostMark\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Modules\Organisation\Models\Organisation;
use Modules\PostMark\Jobs\ProcessInboundEmailJob;
use Modules\PostMark\Models\InboundEmail;

class WebhookController extends Controller
{
    /**
     * Handle incoming PostMark inbound email webhook
     *
     * @param string $organisation Organisation UUID from route
     */
    public function inbound(string $organisation, Request $request): JsonResponse
    {
        try {
            // Validate organisation exists
            $organisationModel = Organisation::findOrFail($organisation);

            // Log webhook receipt
            Log::info('PostMark inbound webhook received', [
                'organisation_id' => $organisationModel->id,
                'message_id' => $request->input('MessageID'),
                'from' => $request->input('FromFull.Email'),
                'subject' => $request->input('Subject'),
            ]);

            // Validate required PostMark webhook fields
            $request->validate([
                'MessageID' => 'required|string',
                'FromFull.Email' => 'required|email',
                'ToFull' => 'required|array',
            ]);

            // Check for duplicate MessageID (idempotent processing)
            $existingEmail = InboundEmail::where('postmark_message_id', $request->input('MessageID'))->first();
            if ($existingEmail) {
                Log::info('Duplicate PostMark webhook received - skipping', [
                    'organisation_id' => $organisationModel->id,
                    'postmark_message_id' => $request->input('MessageID'),
                    'existing_inbound_email_id' => $existingEmail->id,
                ]);

                // Return 200 OK - webhook already processed
                return response()->json(['message' => 'Already processed'], 200);
            }

            // Create InboundEmail record with pending status
            $inboundEmail = InboundEmail::create([
                'organisation_id' => $organisationModel->id,
                'postmark_message_id' => $request->input('MessageID'),
                'from_email' => $request->input('FromFull.Email'),
                'from_name' => $request->input('FromFull.Name'),
                'to_email' => $request->input('ToFull.0.Email'),
                'subject' => $request->input('Subject'),
                'text_body' => $request->input('TextBody'),
                'html_body' => $request->input('HtmlBody'),
                'stripped_text_reply' => $request->input('StrippedTextReply'),
                'in_reply_to' => $request->input('Headers')
                    ? collect($request->input('Headers'))
                        ->firstWhere('Name', 'In-Reply-To')['Value'] ?? null
                    : null,
                'references' => $request->input('Headers')
                    ? collect($request->input('Headers'))
                        ->firstWhere('Name', 'References')['Value'] ?? null
                    : null,
                'raw_headers' => $request->input('Headers'),
                'raw_payload' => $request->all(),
                'processing_status' => 'pending',
            ]);

            // Queue job for async processing
            ProcessInboundEmailJob::dispatch($inboundEmail);

            Log::info('PostMark inbound email stored and job queued', [
                'organisation_id' => $organisationModel->id,
                'inbound_email_id' => $inboundEmail->id,
                'postmark_message_id' => $inboundEmail->postmark_message_id,
            ]);

            // Return 200 OK with empty body
            return response()->json([], 200);

        } catch (\Exception $e) {
            Log::error('PostMark webhook processing failed', [
                'organisation_id' => $organisation,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'payload' => $request->all(),
            ]);

            // Still return 200 to prevent PostMark retries on our application errors
            return response()->json(['error' => 'Internal processing error'], 200);
        }
    }
}
