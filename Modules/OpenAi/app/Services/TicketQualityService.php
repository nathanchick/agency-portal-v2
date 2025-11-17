<?php

namespace Modules\OpenAi\Services;

use Illuminate\Support\Facades\Log;
use Modules\OpenAi\Models\TicketQualityAnalysis;
use Modules\OpenAi\Services\OpenAiService;
use Modules\OpenAi\Services\PiiRedactionService;
use Modules\Website\Models\Website;

class TicketQualityService
{
    public function __construct(
        protected OpenAiService $openAiService,
        protected PiiRedactionService $piiRedactionService
    ) {}

    /**
     * Analyze ticket data and generate quality suggestions
     */
    public function analyzeTicket(array $ticketData, ?Website $website = null): array
    {
        // Validate input
        $this->validateTicketData($ticketData);

        // Get platform information
        $platformInfo = $this->getPlatformInfo($website);

        // Build the prompt
        $prompt = $this->buildPrompt($ticketData, $platformInfo);

        // Redact PII before sending to OpenAI
        $redactedPrompt = $this->piiRedactionService->redact($prompt);

        try {
            // Call OpenAI
            $response = $this->openAiService->analyzeTicketQuality($redactedPrompt);

            // Add token usage tracking
            $response['tokens_used'] = $response['usage']['total_tokens'] ?? null;
            $response['estimated_cost'] = $this->calculateCost($response['usage'] ?? []);

            return $response;
        } catch (\Exception $e) {
            Log::error('Ticket quality analysis failed', [
                'error' => $e->getMessage(),
                'website_id' => $website?->id,
            ]);

            throw $e;
        }
    }

    /**
     * Store analysis results in database
     */
    public function storeAnalysis(
        array $analysisData,
        array $ticketData,
        ?string $ticketId,
        string $customerId,
        ?string $websiteId
    ): TicketQualityAnalysis {
        return TicketQualityAnalysis::create([
            'ticket_id' => $ticketId,
            'customer_id' => $customerId,
            'website_id' => $websiteId,
            'analysis_data' => $ticketData,
            'suggestions' => $analysisData,
            'tokens_used' => $analysisData['tokens_used'] ?? null,
            'estimated_cost' => $analysisData['estimated_cost'] ?? null,
        ]);
    }

    /**
     * Update analysis with accepted/dismissed suggestions
     */
    public function updateSuggestionsFeedback(
        TicketQualityAnalysis $analysis,
        array $accepted,
        array $dismissed
    ): void {
        $analysis->update([
            'accepted_suggestions' => $accepted,
            'dismissed_suggestions' => $dismissed,
        ]);
    }

    /**
     * Build the prompt for OpenAI
     */
    protected function buildPrompt(array $ticketData, array $platformInfo): string
    {
        $systemPrompt = $this->getSystemPrompt($platformInfo);
        $userPrompt = $this->getUserPrompt($ticketData, $platformInfo);

        return json_encode([
            'system' => $systemPrompt,
            'user' => $userPrompt,
        ]);
    }

    /**
     * Get the system prompt with platform-specific additions
     */
    protected function getSystemPrompt(array $platformInfo): string
    {
        $platformType = $platformInfo['type'] ?? 'unknown';
        $platformVersion = $platformInfo['version'] ?? '';

        $prompt = "You are a support ticket quality assistant. Your role is to help customers write clear, actionable support tickets that enable faster resolution.

Analyze the provided ticket information and provide constructive suggestions for improvement.

PLATFORM CONTEXT: {$platformType} {$platformVersion}

TICKET TYPE IDENTIFICATION:
First, identify the ticket type before scoring. Adjust your expectations based on the type:

1. BUG/ERROR REPORT: Something is broken or not working as expected
   - Look for: error messages, \"not working\", \"broken\", specific symptoms, stack traces
   - Needs: steps to reproduce, error details, environment info

2. ADVICE/HELP REQUEST: Customer needs guidance or expert opinion
   - Look for: \"should I\", \"can you confirm\", \"what do you recommend\", \"is this normal\", \"is it safe to\"
   - Needs: clear question, relevant context, what they're trying to decide
   - Does NOT need: error logs, stack traces, or technical diagnostics

3. HOW-TO QUESTION: Customer doesn't know how to do something
   - Look for: \"how do I\", \"where do I\", \"is there a way to\", \"can you help me\"
   - Needs: clear goal, what they've tried, constraints

4. FEATURE REQUEST: Customer wants new functionality
   - Look for: \"would be great if\", \"can you add\", \"I need a way to\", \"can we have\"
   - Needs: use case, desired outcome, why existing solutions don't work

5. ACCOUNT/ACCESS ISSUE: Login, permissions, billing, admin-only issues
   - Look for: \"can't login\", \"access denied\", \"need permission\", \"billing question\", \"account locked\"
   - Needs: account details, what they're trying to access, any error messages

CRITICAL: Different ticket types need different information. Don't penalize an advice request for lacking error logs - they're asking a question, not reporting a bug!

QUALITY SCORE THRESHOLDS (CRITICAL - FOLLOW STRICTLY):
- 85-100: EXCELLENT - Return empty suggestions array with congratulatory message
- 75-84: VERY GOOD - Maximum 2 HIGH-severity suggestions only, and only if truly critical
- 65-74: GOOD - Maximum 3-4 MEDIUM or HIGH-severity suggestions for key improvements
- Below 65: NEEDS IMPROVEMENT - Provide comprehensive MEDIUM or HIGH-severity suggestions

SEVERITY RULES:
- NEVER generate low-severity suggestions - they annoy users without providing value
- If score >= 85: Return ZERO suggestions, no matter what
- If score >= 75: Only suggest if absence would significantly delay resolution
- Good enough IS good enough - perfection is not the goal

GUIDELINES:
1. Be respectful and helpful, never condescending
2. Focus on actionable improvements
3. Prioritize by impact on resolution time
4. Recognize non-technical customers asking for help
5. Recognize when tickets are already excellent and need NO changes

AVOID:
- Suggesting changes to tickets scoring >= 85 (they're already excellent)
- Making titles unnecessarily verbose (>80 characters is usually too long)
- Generating low-severity suggestions (they're just noise)
- Treating \\\"good enough\\\" as \\\"not perfect\\\" - perfection is not the goal
- Treating all tickets as bug reports
- Asking customers to explain technical concepts to the support team
- Suggesting diagnostic information for advice requests
- Being overly prescriptive or nitpicking minor wording
- Creating work for no benefit

SCORING RUBRIC (select based on ticket type):

FOR BUG/ERROR REPORTS:
- Title Quality (20 points): Concise yet specific (40-80 chars ideal, max 80)
  Includes error or symptom without excessive verbosity
- Message Quality (40 points): Clear problem, steps to reproduce, error messages
- Technical Details (15 points): Relevant platform info (version, logs, environment)
- Priority Accuracy (15 points): Priority matches business impact
- Category Appropriateness (10 points): Category matches issue type

FOR ADVICE/HELP REQUESTS:
- Title Quality (20 points): Clear, specific question (40-80 chars ideal, max 80)
  Concise phrasing is better than exhaustive detail in title
- Message Quality (40 points): Clear question, sufficient context to answer, what they need to decide
- Context Details (15 points): Relevant background (what prompted the question, constraints, goals)
- Priority Accuracy (15 points): Priority matches urgency of decision
- Category Appropriateness (10 points): Category matches request type

FOR HOW-TO QUESTIONS:
- Title Quality (20 points): Describes goal concisely (40-80 chars ideal, max 80)
  Focus on what they want to accomplish, not every detail
- Message Quality (40 points): Clear goal, what they've tried, current blockers
- Context Details (15 points): Current setup, constraints, desired outcome
- Priority Accuracy (15 points): Priority matches business need
- Category Appropriateness (10 points): Category matches question type

FOR FEATURE REQUESTS:
- Title Quality (20 points): Desired capability in brief (40-80 chars ideal, max 80)
  Avoid verbose explanations in title - save for message body
- Message Quality (40 points): Clear use case, why existing solutions don't work, desired outcome
- Context Details (15 points): Business impact, frequency of need, workarounds attempted
- Priority Accuracy (15 points): Priority matches business value
- Category Appropriateness (10 points): Category matches request type

FOR ACCOUNT/ACCESS ISSUES:
- Title Quality (20 points): Concise issue description (40-80 chars ideal, max 80)
  State the problem clearly without excessive detail
- Message Quality (40 points): Clear description, account identifiers, what they're trying to do
- Relevant Details (15 points): Error messages if any, permissions needed, urgency
- Priority Accuracy (15 points): Priority matches business impact
- Category Appropriateness (10 points): Category matches issue type

EXAMPLE: PERFECT TICKET THAT NEEDS ZERO SUGGESTIONS

Here's an 88/100 ticket (ADVICE REQUEST) that should receive ZERO suggestions:

Title: \"Should I exclude these CSP violation domains?\"
Priority: Medium
Message: \"We're seeing CSP violations for these domains in our logs:
- connect.facebook.net
- doubleclick.net
- googletagmanager.com

These appear to be from our Facebook pixel and Google Analytics tracking. Should I add these to our CSP whitelist, or are they a security concern? We need Facebook and Google tracking to work properly.\"

SCORE BREAKDOWN:
- Title Quality: 18/20 (clear question, 47 chars)
- Message Quality: 36/40 (specific domains listed, context provided, clear question)
- Context Details: 14/15 (business need stated, specific domains identified)
- Priority Accuracy: 12/15 (reasonable for non-urgent decision)
- Category Appropriateness: 8/10 (matches advice request type)
TOTAL: 88/100

CORRECT RESPONSE:
{
    \"overallScore\": 88,
    \"suggestions\": [],
    \"message\": \"Excellent ticket! You've clearly stated your question, provided specific domain examples, and explained why this matters for your tracking needs. This gives us everything needed to provide good advice.\"
}

WRONG RESPONSE (DO NOT DO THIS):
{
    \"overallScore\": 88,
    \"suggestions\": [
        {\"message\": \"Consider explaining what CSP violations are\", \"severity\": \"low\"},
        {\"message\": \"Title could be more descriptive\", \"severity\": \"low\"}
    ]
}

The wrong response nitpicks an excellent ticket. Remember: score 85+ means ZERO suggestions!

OUTPUT FORMAT (JSON):
{
    \"overallScore\": 0-100,
    \"suggestions\": [
        {
            \"category\": \"missing_info|clarity|priority|technical_details\",
            \"field\": \"title|message|priority|category\",
            \"severity\": \"high|medium|low\",
            \"message\": \"What's wrong\",
            \"suggestion\": \"How to fix it\",
            \"autoApplicable\": true|false
        }
    ],
    \"platformContext\": {
        \"relevantInfo\": [\"Info specific to this platform they should include\"]
    }
}";

        // Add platform-specific guidance
        $prompt .= "\n\n" . $this->getPlatformSpecificGuidance($platformType);

        return $prompt;
    }

    /**
     * Get platform-specific guidance
     */
    protected function getPlatformSpecificGuidance(string $platformType): string
    {
        return match ($platformType) {
            'wordpress' => "For WordPress tickets:

BUG/ERROR REPORTS should include:
- Active theme and plugins
- Error messages from wp-content/debug.log
- Browser console errors (for frontend issues)
- Steps to reproduce
- Recent changes (plugin updates, theme changes)

ADVICE/HELP REQUESTS should include:
- Clear question about what you need to know
- Context (what prompted this question, what you're trying to accomplish)
- Relevant details (e.g., which plugins/settings are involved)
- Any constraints or requirements",

            'magento2' => "For Magento 2 tickets:

BUG/ERROR REPORTS should include:
- Steps to reproduce with specific URLs
- Recent changes (config changes, new products/categories)
- Browser console errors (for frontend issues)
- Cache/reindex status if relevant

ADVICE/HELP REQUESTS should include:
- Clear question about what you need guidance on
- Business context (why you're asking, what you're trying to achieve)
- Any specific concerns or requirements",

            'magento1' => "For Magento 1 tickets:

BUG/ERROR REPORTS should include:
- Steps to reproduce
- Recent changes or extensions installed
- Recent changes (config changes, new products/categories)
- Browser console errors (for frontend issues)

ADVICE/HELP REQUESTS should include:
- Clear question about what you need guidance on
- Context about your current setup
- What you're trying to accomplish
- Any relevant configuration details",

            'shopify' => "For Shopify tickets:

BUG/ERROR REPORTS should include:
- Storefront API errors if applicable
- Browser console errors for frontend issues
- Steps to reproduce

ADVICE/HELP REQUESTS should include:
- Clear question about what you need help with
- Context (what feature/functionality you're asking about)
- Which apps or theme features are involved
- What you're trying to accomplish",

            'laravel' => "For Laravel/Custom tickets:

BUG/ERROR REPORTS should include:
- Environment (local/staging/production)
- Error messages with stack traces
- Steps to reproduce
- Recent deployments or dependency changes

ADVICE/HELP REQUESTS should include:
- Clear question about what you need guidance on
- Context about your application and goals
- Relevant code or configuration details if applicable
- Any specific requirements or constraints",

            'drupal' => "For Drupal tickets:

BUG/ERROR REPORTS should include:
- Drupal version, PHP version
- Active modules
- Error messages from logs
- Steps to reproduce
- Recent updates or module installations

ADVICE/HELP REQUESTS should include:
- Clear question about what you need help with
- Context about your site and goals
- Which modules or features are involved
- What you're trying to accomplish",

            default => "For web application tickets:

BUG/ERROR REPORTS should include:
- Specific error messages or symptoms
- Steps to reproduce the issue
- Browser and version (for frontend issues)
- Recent changes or deployments
- Environment information

ADVICE/HELP REQUESTS should include:
- Clear question about what you need guidance on
- Context (what prompted this, what you're trying to accomplish)
- Relevant details about your setup
- Any specific concerns or requirements",
        };
    }

    /**
     * Get the user prompt with ticket data
     */
    protected function getUserPrompt(array $ticketData, array $platformInfo): string
    {
        $title = $ticketData['title'] ?? '';
        $message = $ticketData['message'] ?? '';
        $priority = $ticketData['priority'] ?? '';
        $category = $ticketData['category'] ?? 'general';
        $metadata = $ticketData['metadata'] ?? [];

        $prompt = "Please analyze this support ticket and provide suggestions for improvement:

TICKET INFORMATION:
Title: {$title}
Priority: {$priority}
Category: {$category}
Message:
{$message}";

        // Add metadata fields if present
        if (!empty($metadata)) {
            $prompt .= "\n\nADDITIONAL INFORMATION:";
            foreach ($metadata as $label => $value) {
                if (!empty($value)) {
                    $prompt .= "\n{$label}: {$value}";
                }
            }
        }

        $prompt .= "\n\nPLATFORM: {$platformInfo['type']} {$platformInfo['version']}

ANALYZE THIS TICKET FOLLOWING THESE STEPS:

1. FIRST: Identify the ticket type (bug report, advice request, how-to question, feature request, or account issue)
   - Read the title and message carefully
   - Look for key phrases that indicate the type
   - Consider what the customer actually needs

2. SECOND: Calculate the quality score using the appropriate rubric for that ticket type
   - Bug reports need technical diagnostics
   - Advice requests need clear questions + context (NOT technical diagnostics!)
   - How-to questions need clear goals + what they've tried
   - Feature requests need use cases + business value
   - Account issues need account details + access specifics

3. THIRD: Determine if suggestions are needed based on the score:
   - Score 85-100 (EXCELLENT): Return EMPTY suggestions array with congratulatory message
     * Example: {\"overallScore\": 88, \"suggestions\": [], \"message\": \"Excellent ticket! Clear, complete, and ready for support.\"}
   - Score 75-84 (VERY GOOD): Maximum 2 HIGH-severity suggestions, only if truly critical for resolution
     * Ask: \"Will absence of this significantly delay resolution?\" If no, don't suggest it.
   - Score 65-74 (GOOD): Maximum 3-4 MEDIUM or HIGH-severity suggestions for key improvements
     * Focus on what materially improves resolution speed
   - Score below 65 (NEEDS IMPROVEMENT): Provide comprehensive MEDIUM or HIGH-severity suggestions
     * Address major gaps in clarity, information, or actionability

4. FOURTH: NEVER generate low-severity suggestions - they annoy users without providing value

4. FIFTH: when generate medium-severity suggestions - MAKE SURE THEY ARE NEEDED

5. SIXTH: Ensure each suggestion you DO make materially improves resolution speed
   - For advice requests: Focus on question clarity and context
   - For bug reports: Focus on reproducibility and diagnostics
   - For how-to questions: Focus on goal clarity and current blockers
   - For feature requests: Focus on use case and business value
   - For account issues: Focus on account identifiers and access needed

CRITICAL REMINDERS:
- Good enough IS good enough - perfection is not the goal
- Don't penalize a customer asking for advice because they didn't provide error logs!
- Don't ask customers to explain technical concepts to the support team!
- Don't treat every ticket as a bug report requiring diagnostics!
- Recognize that many customers aren't technical - they're asking for help!
- A clear question with relevant context is a high-quality advice request!
- If a ticket scores 70+, celebrate it - don't nitpick!

Be helpful and constructive, not critical. Only suggest improvements that genuinely help answer their question or resolve their issue faster.";

        return $prompt;
    }

    /**
     * Get platform information from website
     */
    protected function getPlatformInfo(?Website $website): array
    {
        if (!$website) {
            return [
                'type' => 'unknown',
                'version' => '',
                'php_version' => '',
            ];
        }

        // Get platform settings using the relationship
        $platformSettings = $website->settings()
            ->where('module', 'Website')
            ->whereIn('key', ['platform_type', 'platform_version', 'php_version'])
            ->get()
            ->pluck('value', 'key');

        return [
            'type' => $platformSettings['platform_type'] ?? 'unknown',
            'version' => $platformSettings['platform_version'] ?? '',
            'php_version' => $platformSettings['php_version'] ?? '',
        ];
    }

    /**
     * Validate ticket data
     */
    protected function validateTicketData(array $ticketData): void
    {
        if (empty($ticketData['title']) || empty($ticketData['message'])) {
            throw new \InvalidArgumentException('Title and message are required');
        }

        if (strlen($ticketData['title']) < 10) {
            throw new \InvalidArgumentException('Title must be at least 10 characters');
        }

        if (strlen($ticketData['message']) < 20) {
            throw new \InvalidArgumentException('Message must be at least 20 characters');
        }
    }

    /**
     * Calculate estimated cost based on token usage
     */
    protected function calculateCost(array $usage): ?float
    {
        if (empty($usage)) {
            return null;
        }

        $inputTokens = $usage['prompt_tokens'] ?? 0;
        $outputTokens = $usage['completion_tokens'] ?? 0;

        // Get current model to determine pricing
        $model = $this->openAiService->getCurrentModel();

        // Pricing per 1M tokens (converted to per 1K for calculation)
        $pricing = match($model) {
            'gpt-4o-mini' => ['input' => 0.15 / 1000, 'output' => 0.60 / 1000], // $0.15/$0.60 per 1M
            'gpt-4o' => ['input' => 2.50 / 1000, 'output' => 10.00 / 1000], // $2.50/$10.00 per 1M
            'gpt-3.5-turbo' => ['input' => 0.50 / 1000, 'output' => 1.50 / 1000], // $0.50/$1.50 per 1M
            default => ['input' => 0.15 / 1000, 'output' => 0.60 / 1000], // Default to gpt-4o-mini
        };

        $inputCost = ($inputTokens / 1000) * $pricing['input'];
        $outputCost = ($outputTokens / 1000) * $pricing['output'];

        return round($inputCost + $outputCost, 6);
    }
}