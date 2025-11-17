/**
 * CSP Violation Analysis Types
 */

export type TrustAssessment = 'trusted' | 'caution' | 'risky' | 'unknown';
export type RiskLevel = 'low' | 'medium' | 'high';

/**
 * Individual finding for a blocked URL
 */
export interface CspAnalysisFinding {
    url: string;
    description: string;
    concerns: string[] | string; // Can be array or string for flexibility
}

/**
 * Complete CSP violation analysis response
 */
export interface CspViolationAnalysis {
    id: string;
    customer_id: string;
    host: string;
    directive: string;
    blocked_urls: string[];
    trust_assessment: TrustAssessment | null;
    risk_level: RiskLevel | null;
    findings: CspAnalysisFinding[];
    recommendations: string[];
    tokens_used: number | null;
    cost: number | null;
    model: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Request payload for analyzing CSP violations
 */
export interface AnalyzeCspViolationParams {
    customer_id: string;
    host: string;
    directive: string;
    blocked_urls: string[];
}

/**
 * API response for CSP violation analysis
 */
export interface AnalyzeCspViolationResponse {
    success: boolean;
    analysis: CspViolationAnalysis;
    error?: string;
}
