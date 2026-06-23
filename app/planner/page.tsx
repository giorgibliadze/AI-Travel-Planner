import type { Metadata } from "next";
import PlannerHeader from "@/components/PlannerHeader";

export const metadata: Metadata = {
  title: "AI Planner",
  description: "Create your personalized travel itinerary with TripNova AI.",
};

export default function PlannerPage() {
  return <PlannerHeader />;
}
