<?php

namespace Modules\PostMark\Services;

use Modules\PostMark\Models\InboundEmail;

class EmailParser
{
    /**
     * Get clean email body content
     * For new emails: Use TextBody with signatures removed
     * For replies: Use StrippedTextReply (PostMark already cleaned quoted text)
     */
    public function getCleanBody(InboundEmail $inboundEmail): string
    {
        // For replies, prefer StrippedTextReply as PostMark has already cleaned it
        if (! empty($inboundEmail->stripped_text_reply)) {
            return trim($this->removeSignature($inboundEmail->stripped_text_reply));
        }

        // For new emails, use TextBody
        if (! empty($inboundEmail->text_body)) {
            return trim($this->removeSignature($inboundEmail->text_body));
        }

        // Fallback: Convert HTML to text if TextBody is empty
        if (! empty($inboundEmail->html_body)) {
            $text = $this->convertHtmlToText($inboundEmail->html_body);

            return trim($this->removeSignature($text));
        }

        return '';
    }

    /**
     * Remove common email signatures from text
     */
    public function removeSignature(string $text): string
    {
        $patterns = config('postmark.signature_patterns', [
            '/^--\s*$/m',                           // Standard signature delimiter
            '/^___+$/m',                            // Underscore delimiter
            '/Sent from my (iPhone|iPad|Android)/i', // Mobile signatures
            '/^Disclaimer:.*$/ms',                  // Disclaimer blocks
            '/Sent with Mailsuite.*$/ms',           // Email client footers
        ]);

        // Apply each pattern
        foreach ($patterns as $pattern) {
            // Split on the pattern and take only the first part (before signature)
            $parts = preg_split($pattern, $text, 2);
            if (count($parts) > 1) {
                $text = $parts[0];
            }
        }

        // Remove trailing whitespace
        return trim($text);
    }

    /**
     * Convert HTML email body to plain text
     */
    public function convertHtmlToText(string $html): string
    {
        // Remove scripts and styles
        $html = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $html);
        $html = preg_replace('/<style\b[^>]*>(.*?)<\/style>/is', '', $html);

        // Convert <br> and <p> to newlines
        $html = preg_replace('/<br\s*\/?>/i', "\n", $html);
        $html = preg_replace('/<\/p>/i', "\n\n", $html);
        $html = preg_replace('/<p[^>]*>/i', '', $html);

        // Convert <li> to bullet points
        $html = preg_replace('/<li[^>]*>/i', '• ', $html);
        $html = preg_replace('/<\/li>/i', "\n", $html);

        // Convert headings to text with emphasis
        $html = preg_replace('/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i', "\n\n$1\n\n", $html);

        // Convert links to [text](url) format
        $html = preg_replace('/<a\s+href=["\']([^"\']+)["\'][^>]*>(.*?)<\/a>/i', '$2 ($1)', $html);

        // Strip all remaining HTML tags
        $text = strip_tags($html);

        // Decode HTML entities
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');

        // Clean up excessive newlines (more than 2 consecutive)
        $text = preg_replace('/\n{3,}/', "\n\n", $text);

        // Clean up excessive spaces
        $text = preg_replace('/[ \t]+/', ' ', $text);

        return trim($text);
    }

    /**
     * Clean and format subject line
     */
    public function getCleanSubject(InboundEmail $inboundEmail): string
    {
        $subject = $inboundEmail->subject ?? 'No Subject';

        // Remove common reply prefixes
        $subject = preg_replace('/^(Re|RE|Fwd|FW|FWD):\s*/i', '', $subject);

        return trim($subject);
    }
}
