<?php

namespace Modules\OpenAi\Services;

use Illuminate\Support\Facades\Log;
use Modules\OpenAi\Models\CspViolationAnalysis;
use Modules\OpenAi\Services\OpenAiService;
use Modules\OpenAi\Services\PiiRedactionService;
use Modules\Organisation\Models\Organisation;

class CspViolationAnalysisService
{
    public function __construct(
        protected OpenAiService $openAiService,
        protected PiiRedactionService $piiRedactionService,
        protected Organisation $organisation
    ) {}

    /**
     * Analyze CSP violation and generate security assessment
     *
     * @param string $customerId The customer ID
     * @param string $host The violated host
     * @param string $directive The CSP directive (e.g., 'style-src-elem')
     * @param array $blockedUrls Array of blocked URLs to analyze
     * @return array Analysis results with trust_assessment, risk_level, findings, recommendations
     * @throws \Exception
     */
    public function analyzeViolation(string $customerId, string $host, string $directive, array $blockedUrls): array
    {
        // Validate input
        $this->validateInput($customerId, $host, $directive, $blockedUrls);

        // Build the prompt for OpenAI
        $messages = $this->buildPrompt($host, $directive, $blockedUrls);

        // Conditionally redact PII based on organization settings
        if ($this->shouldRedactPii()) {
            $redactedMessages = json_encode([
                'system' => $this->piiRedactionService->redact($messages['system']),
                'user' => $this->piiRedactionService->redact($messages['user']),
            ]);
        } else {
            $redactedMessages = json_encode($messages);
        }

        try {
            // Call OpenAI using the generic method that expects JSON response
            $response = $this->openAiService->analyzeCspViolation($redactedMessages);

            // Add token usage tracking
            $response['tokens_used'] = $response['usage']['total_tokens'] ?? null;
            $response['cost'] = $this->calculateCost($response['usage']['total_tokens'] ?? 0, $this->openAiService->getCurrentModel());
            $response['model'] = $this->openAiService->getCurrentModel();

            return $response;
        } catch (\Exception $e) {
            Log::error('CSP violation analysis failed', [
                'error' => $e->getMessage(),
                'customer_id' => $customerId,
                'host' => $host,
                'directive' => $directive,
            ]);

            throw $e;
        }
    }

    /**
     * Build the prompt messages for OpenAI
     *
     * @param string $host The violated host
     * @param string $directive The CSP directive
     * @param array $blockedUrls Array of blocked URLs
     * @return array Messages array with 'system' and 'user' keys
     */
    public function buildPrompt(string $host, string $directive, array $blockedUrls): array
    {
        return [
            'system' => $this->getSystemPrompt(),
            'user' => $this->getUserPrompt($host, $directive, $blockedUrls),
        ];
    }

    /**
     * Get the system prompt with security analysis instructions
     *
     * @return string The system prompt
     */
    public function getSystemPrompt(): string
    {
        return "You are a web security expert specializing in Content Security Policy (CSP) analysis. Your role is to assess CSP violations and provide actionable security recommendations.

ANALYSIS FRAMEWORK:

1. DOMAIN TRUST ASSESSMENT:
   Evaluate the domain's trustworthiness:

   TRUSTED SOURCES:
   - Major CDNs: Cloudflare (cdnjs.cloudflare.com), CloudFront (*.cloudfront.net), Fastly, jsDelivr
   - Google Services: fonts.googleapis.com, fonts.gstatic.com, ajax.googleapis.com, www.googletagmanager.com
   - Microsoft CDNs: ajax.aspnetcdn.com, *.azureedge.net
   - Popular platforms: cdn.shopify.com, platform.twitter.com, connect.facebook.net
   - Analytics: google-analytics.com, doubleclick.net, analytics.google.com
   - Well-known libraries: unpkg.com, cdn.jsdelivr.net

   USE CAUTION:
   - Lesser-known CDNs
   - Third-party tracking/advertising domains
   - Unknown or unfamiliar domains
   - Domains with suspicious patterns

   RISKY/DANGEROUS:
   - Unencrypted HTTP sources (should use HTTPS)
   - data: URIs (can execute arbitrary code)
   - blob: URIs (dynamic content, potential XSS vector)
   - inline scripts or styles (when flagged by CSP)
   - Domains known for malware or phishing
   - Typosquatting domains (e.g., googIe.com instead of google.com)

2. DANGEROUS PATTERNS:
   Identify security risks:
   - eval() or Function() constructor usage
   - Inline event handlers (onclick, onerror, etc.)
   - Inline scripts without nonce/hash
   - data: URIs in script contexts
   - blob: URLs for scripts
   - Unsafe-inline directives
   - Wildcard (*) sources

3. DIRECTIVE-SPECIFIC RISK ASSESSMENT:
   Different directives carry different risk levels:

   HIGH RISK (direct code execution):
   - script-src: Direct JavaScript execution
   - script-src-elem: External script elements
   - worker-src: Web workers can execute code
   - object-src: Plugins can execute arbitrary code

   MEDIUM RISK (data loading/rendering):
   - style-src: CSS can sometimes be exploited
   - style-src-elem: External stylesheets
   - font-src: Font files (lower risk but possible vectors)
   - img-src: Images (minimal risk, but data exfiltration possible)

   LOW RISK (data/connectivity):
   - connect-src: XHR/fetch endpoints
   - media-src: Audio/video sources
   - frame-src: iframes (isolated by same-origin policy)

4. CONTEXT EVALUATION:
   Consider the broader context:
   - Is this a legitimate third-party service needed for functionality?
   - Are there safer alternatives available?
   - What data could be exposed if this source is compromised?
   - Is the violation from user-generated content or core application code?

OUTPUT FORMAT (JSON):
You must respond with valid JSON in this exact format:
{
    \"trust_assessment\": \"trusted|caution|risky|unknown\",
    \"risk_level\": \"low|medium|high\",
    \"findings\": [
        {
            \"url\": \"specific URL analyzed\",
            \"description\": \"what this resource is\",
            \"concerns\": [\"array of specific security concerns, or empty array if none\"]
        }
    ],
    \"recommendations\": [
        \"Specific actionable recommendation 1\",
        \"Specific actionable recommendation 2\"
    ]
}

GUIDELINES:
1. Be specific and actionable - avoid generic advice
2. Explain WHY something is risky, not just THAT it's risky
3. Provide concrete next steps the user can take
4. Consider the business context - some third-party integrations are necessary
5. Distinguish between \"security risk\" and \"privacy concern\"
6. If sources are trusted, say so clearly and recommend whitelisting
7. Never recommend allowing unsafe-inline or unsafe-eval unless absolutely necessary with strong warnings

SEVERITY CALIBRATION:
- trust_assessment='trusted' + risk_level='low': Well-known, reputable services
- trust_assessment='caution' + risk_level='medium': Third-party services that should be monitored
- trust_assessment='risky' + risk_level='high': Dangerous patterns or unknown domains
- trust_assessment='unknown' + risk_level='medium': Unable to determine with provided information";
    }

    /**
     * Get the user prompt with violation details
     *
     * @param string $host The violated host
     * @param string $directive The CSP directive
     * @param array $blockedUrls Array of blocked URLs
     * @return string The user prompt
     */
    protected function getUserPrompt(string $host, string $directive, array $blockedUrls): string
    {
        $urlList = '';
        foreach ($blockedUrls as $index => $url) {
            $urlList .= ($index + 1) . ". {$url}\n";
        }

        return "Please analyze the following CSP violation and provide a security assessment:

VIOLATION DETAILS:
Website Host: {$host}
CSP Directive Violated: {$directive}
Number of Blocked URLs: " . count($blockedUrls) . "

BLOCKED URLS:
{$urlList}

ANALYSIS REQUIRED:
1. Assess the trustworthiness of each blocked URL/domain
2. Evaluate the security risk based on the specific CSP directive violated
3. Identify any dangerous patterns (eval, inline scripts, data: URIs, etc.)
4. Determine if these are legitimate services the site should whitelist or security threats to block
5. Provide specific, actionable recommendations

Remember:
- Consider that {$directive} violations carry different risk levels based on what they control
- Some third-party services (analytics, CDNs) are legitimate business needs
- Focus on practical security guidance, not just theoretical risks
- Be specific about WHY something is trusted or risky

Please respond in JSON format as specified in the system prompt.";
    }

    /**
     * Store analysis results in database
     *
     * @param string $customerId Customer ID
     * @param string $host Violated host
     * @param string $directive CSP directive
     * @param array $blockedUrls Blocked URLs
     * @param array $analysisData Analysis results from OpenAI
     * @return CspViolationAnalysis
     */
    public function storeAnalysis(
        string $customerId,
        string $host,
        string $directive,
        array $blockedUrls,
        array $analysisData
    ): CspViolationAnalysis {
        return CspViolationAnalysis::create([
            'customer_id' => $customerId,
            'host' => $host,
            'directive' => $directive,
            'blocked_urls' => $blockedUrls,
            'trust_assessment' => $analysisData['trust_assessment'] ?? null,
            'risk_level' => $analysisData['risk_level'] ?? null,
            'findings' => $analysisData['findings'] ?? null,
            'recommendations' => $analysisData['recommendations'] ?? null,
            'tokens_used' => $analysisData['tokens_used'] ?? null,
            'cost' => $analysisData['cost'] ?? null,
            'model' => $analysisData['model'] ?? null,
        ]);
    }

    /**
     * Calculate estimated cost based on token usage and model
     *
     * @param int $tokensUsed Total tokens used
     * @param string $model Model name
     * @return float|null Cost in dollars
     */
    public function calculateCost(int $tokensUsed, string $model): ?float
    {
        if ($tokensUsed === 0) {
            return null;
        }

        // Pricing per 1M tokens (converted to per 1K for calculation)
        $pricing = match($model) {
            'gpt-4o-mini' => 0.15 / 1000, // Average of input/output for simplicity
            'gpt-4o' => 6.25 / 1000, // Average of $2.50 input and $10.00 output
            'gpt-3.5-turbo' => 1.00 / 1000, // Average of $0.50 input and $1.50 output
            default => 0.15 / 1000, // Default to gpt-4o-mini
        };

        return round(($tokensUsed / 1000) * $pricing, 6);
    }

    /**
     * Validate input parameters
     *
     * @param string $customerId Customer ID
     * @param string $host Host
     * @param string $directive Directive
     * @param array $blockedUrls Blocked URLs
     * @throws \InvalidArgumentException
     */
    protected function validateInput(string $customerId, string $host, string $directive, array $blockedUrls): void
    {
        if (empty($customerId)) {
            throw new \InvalidArgumentException('Customer ID is required');
        }

        if (empty($host)) {
            throw new \InvalidArgumentException('Host is required');
        }

        if (empty($directive)) {
            throw new \InvalidArgumentException('Directive is required');
        }

        if (empty($blockedUrls) || !is_array($blockedUrls)) {
            throw new \InvalidArgumentException('At least one blocked URL is required');
        }

        // Validate UUID format for customer_id
        if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $customerId)) {
            throw new \InvalidArgumentException('Invalid customer ID format');
        }
    }

    /**
     * Check if PII redaction is enabled for CSP analysis
     *
     * @return bool
     */
    protected function shouldRedactPii(): bool
    {
        $setting = $this->organisation->settings()
            ->where('module', 'OpenAi')
            ->where('key', 'csp_pii_redaction_enabled')
            ->first();

        return $setting ? (bool) $setting->value : false;
    }
}
