export interface CspViolation {
  id: string;
  customer_id: string;
  website_id: string | null;
  directive: string;
  host: string | null;
  blocked_uri: string;
  document_uri: string;
  violated_directive: string;
  effective_directive: string | null;
  source_file: string | null;
  line_number: number | null;
  column_number: number | null;
  disposition: 'enforce' | 'report';
  status: 'new' | 'approved' | 'rejected' | 'ignored';
  decided_by: string | null;
  decided_at: string | null;
  decision_notes: string | null;
  occurrence_count: number;
  first_seen_at: string;
  last_seen_at: string;
  raw_report: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  website?: {
    id: string;
    name: string;
    domain: string;
  };
  decider?: {
    id: string;
    name: string;
    email: string;
  };
  latest_decision?: CspViolationDecision;
  decisions?: CspViolationDecision[];
}

export interface CspViolationHostGroup {
  host: string;
  directive: string;
  status: 'new' | 'approved' | 'rejected' | 'ignored';
  url_count: number;
  total_occurrences: number;
  first_seen_at: string;
  last_seen_at: string;
}

export interface CspViolationDecision {
  id: string;
  csp_violation_id: string;
  action: 'approved' | 'rejected' | 'ignored' | 'reopened';
  user_id: string;
  user_name: string;
  user_email: string;
  ip_address: string | null;
  user_agent: string | null;
  notes: string | null;
  meta_data: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CspStats {
  total: number;
  new: number;
  approved: number;
  rejected: number;
  ignored: number;
  by_directive: Record<string, number>;
}

export interface CspFilters {
  directive?: string;
  status?: string;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CspDecisionForm {
  notes: string;
}
