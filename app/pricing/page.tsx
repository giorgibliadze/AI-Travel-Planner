import type { Metadata } from "next";
import PricingContent from "@/components/PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description: "TripNova AI pricing — Starter, Pro, Agency.",
};

export default function PricingPage() {
  return <PricingContent />;
}
