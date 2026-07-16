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
  | "signup_source"
  | "name"
  | "email";

export type Operator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "contains";

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

export function isGroup(rule: Rule): rule is Group {
  return (rule as Group).combinator !== undefined;
}

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
  queryResult?: {
    rows: Record<string, unknown>[];
    rowCount: number;
  };
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

export interface ContactCandidate {
  key: string;
  name: string;
  kind: "email" | "phone";
  confidence: number;
}

export interface DatasetProposal {
  segmentName: string;
  contactColumn: string;
  channel: Channel;
  message: string;
  reasoning: string;
  assumptions: string[];
  audienceSql: string;
}

export interface DatasetAudience {
  count: number;
  sample: Record<string, unknown>[];
}

export type ProposeResponse =
  | { kind: "proposal"; proposal: CampaignProposal; audience: AudiencePreview }
  | { kind: "clarification"; question: string; options: string[] }
  | {
      kind: "query";
      intent: string;
      rows: Record<string, unknown>[];
      rowCount: number;
      sql: string;
    }
  | { kind: "chat"; message: string }
  | {
      kind: "dataset_proposal";
      proposal: DatasetProposal;
      audience: DatasetAudience;
      contactCandidates: ContactCandidate[];
    };
