import type { Profile, ProfileInsert, Subscription, SubscriptionInsert } from "./auth";
import type { GeneratedTrip, SavedTrip, TravelStyle, TripLanguage } from "./trip";

type AnyTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      [key: string]: AnyTable;
      profiles: {
        Row: Profile & Record<string, unknown>;
        Insert: ProfileInsert & Record<string, unknown>;
        Update: Partial<Omit<Profile, "id" | "created_at">> & Record<string, unknown>;
        Relationships: [];
      };
      trips: {
        Row: SavedTrip & Record<string, unknown>;
        Insert: {
          id?: string;
          user_id: string;
          destination: string;
          start_date: string;
          end_date: string;
          travelers: number;
          budget: number;
          travel_style: TravelStyle;
          language: TripLanguage;
          itinerary_json: GeneratedTrip;
          created_at?: string;
        } & Record<string, unknown>;
        Update: Partial<Omit<SavedTrip, "id" | "user_id" | "created_at">> & Record<string, unknown>;
        Relationships: [];
      };
      subscriptions: {
        Row: Subscription & Record<string, unknown>;
        Insert: SubscriptionInsert & Record<string, unknown>;
        Update: Partial<Omit<Subscription, "id" | "user_id" | "started_at">> & Record<string, unknown>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
