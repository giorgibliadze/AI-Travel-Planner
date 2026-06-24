export type Plan = "free" | "pro" | "agency";
export type SubscriptionStatus = "active" | "canceled" | "expired";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  plan: Plan;
  monthly_trip_limit: number;
  monthly_trip_count: number;
  created_at: string;
}

export type ProfileInsert = Record<string, unknown> & {
  id: string;
  full_name?: string | null;
  email?: string | null;
  plan?: Plan;
  monthly_trip_limit?: number;
  monthly_trip_count?: number;
  created_at?: string;
};

export interface Subscription {
  id: string;
  user_id: string;
  plan: Plan;
  status: SubscriptionStatus;
  started_at: string;
  expires_at: string | null;
}

export type SubscriptionInsert = Record<string, unknown> & {
  id?: string;
  user_id: string;
  plan: Plan;
  status: SubscriptionStatus;
  started_at?: string;
  expires_at?: string | null;
};
