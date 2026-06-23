import type { Metadata } from "next";
import DestinationsContent from "@/components/DestinationsContent";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Discover the world's best travel destinations with TripNova AI.",
};

export default function DestinationsPage() {
  return <DestinationsContent />;
}
