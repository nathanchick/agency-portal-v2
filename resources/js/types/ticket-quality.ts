/**
 * Ticket Quality Analysis Types
 */

export type SuggestionCategory = 'missing_info' | 'clarity' | 'priority' | 'technical_details';
export type SuggestionField = 'title' | 'message' | 'priority' | 'category';
export type SuggestionSeverity = 'high' | 'medium' | 'low';

/**
 * Individual suggestion for improving the ticket
 */
export interface TicketSuggestion {
    id?: string;
    category: SuggestionCategory;
    field: SuggestionField;
    severity: SuggestionSeverity;
    message: string;
    suggestion: string;
    autoApplicable: boolean;
}

/**
 * Platform context information
 */
export interface PlatformContext {
    platform?: string;
    version?: string;
    relevantInfo: string[];
}

/**
 * Complete ticket quality analysis response
 */
export interface TicketQualityAnalysis {
    overallScore: number;
    suggestions: TicketSuggestion[];
    platformContext?: PlatformContext;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

/**
 * Request payload for analyzing a ticket
 */
export interface AnalyzeTicketRequest {
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    category?: string;
    website_id?: string;
    customer_id: string;
    metadata?: Record<string, any>;
}

/**
 * Quality score thresholds
 */
export interface QualityThresholds {
    good: number;
    fair: number;
}

/**
 * API response for ticket analysis
 */
export interface AnalyzeTicketResponse {
    success: boolean;
    analysis: TicketQualityAnalysis;
    thresholds?: QualityThresholds;
    error?: string;
}