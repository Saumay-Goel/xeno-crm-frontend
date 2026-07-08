export type Channel = "whatsapp" | "sms" | "email" | "rcs";

export interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  orderCount: number;
  totalSpend: number;
  createdAt: string;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type SegmentField =
  | "total_spend"
  | "order_count"
  | "days_since_last_order"
  | "city"
  | "signup_source";
export type Operator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in";
export interface Condition {
  field: SegmentField;
  op: Operator;
  value: string | number | Array<string | number>;
}
export interface Group {
  combinator: "and" | "or";
  rules: Rule[];
}
export type Rule = Condition | Group;

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  city: string | null;
  totalSpend: number;
  orderCount: number;
  daysSinceLastOrder: number | null;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  customers?: { count: number; rows: CustomerRow[] };
}

export interface AudiencePreview {
  count: number;
  preview: Array<{
    id: string;
    name: string;
    email: string;
    city: string | null;
    totalSpend: number;
    orderCount: number;
    daysSinceLastOrder: number | null;
  }>;
}

export interface CampaignProposal {
  kind: "proposal";
  segmentName: string;
  rules: Rule;
  message: string;
  channel: Channel;
  reasoning: string;
  assumptions: string[];
}

export interface ProposeProposalResponse {
  kind: "proposal";
  proposal: CampaignProposal;
  audience: AudiencePreview;
}

export interface ProposeClarificationResponse {
  kind: "clarification";
  question: string;
  options: string[];
}

export type ProposeResponse =
  | { kind: "proposal"; proposal: CampaignProposal; audience: AudiencePreview }
  | { kind: "clarification"; question: string; options: string[] }
  | { kind: "query"; intent: string; audience: AudiencePreview };
