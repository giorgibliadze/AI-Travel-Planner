export type TravelStyle = "luxury" | "budget" | "adventure" | "family" | "romantic";
export type TripLanguage = "ka" | "en" | "ru";
export type TimelineType = "food" | "sightseeing" | "transport" | "leisure";

export interface TimelineItem {
  time: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  cost: string;
  type: TimelineType;
  tip: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  weather: string;
  dailyBudget: number;
  aiTip: string;
  timeline: TimelineItem[];
}

export interface TripSummary {
  destination: string;
  totalDays: number;
  travelers: number;
  totalBudget: number;
  averageDailyBudget: number;
  travelStyle: TravelStyle;
}

export interface GeneratedTrip {
  summary: TripSummary;
  itinerary: ItineraryDay[];
}

export interface SavedTrip {
  id: string;
  user_id: string;
  destination: string;
  start_date: string;
  end_date: string;
  travelers: number;
  budget: number;
  travel_style: TravelStyle;
  language: TripLanguage;
  itinerary_json: GeneratedTrip;
  created_at: string;
}
