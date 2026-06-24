import OpenAI from "openai";
import { createServerSupabaseClient, getBearerToken } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Profile, ProfileInsert } from "@/types/auth";

type TravelStyle = "luxury" | "budget" | "adventure" | "family" | "romantic";
type Language = "ka" | "en" | "ru";
type TimelineType = "food" | "sightseeing" | "transport" | "leisure";

interface GenerateTripRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  travelStyle: TravelStyle;
  language: Language;
}

interface TimelineItem {
  time: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  cost: string;
  type: TimelineType;
  tip: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  weather: string;
  dailyBudget: number;
  aiTip: string;
  timeline: TimelineItem[];
}

interface TripResponse {
  summary: {
    destination: string;
    totalDays: number;
    travelers: number;
    totalBudget: number;
    averageDailyBudget: number;
    travelStyle: TravelStyle;
  };
  itinerary: ItineraryDay[];
}

const travelStyles: readonly TravelStyle[] = ["luxury", "budget", "adventure", "family", "romantic"];
const languages: readonly Language[] = ["ka", "en", "ru"];
const timelineTypes: readonly TimelineType[] = ["food", "sightseeing", "transport", "leisure"];
const maxTripDays = 14;
const openAiBillingRequiredMessage =
  "AI გენერაციისთვის საჭიროა OpenAI Billing-ის გააქტიურება. დროებით ნაჩვენებია ლოკალური გეგმა.";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const limitMessages: Record<Language, { freeLimit: string; freeDays: string }> = {
  ka: {
    freeLimit: "უფასო პაკეტის ლიმიტი ამოიწურა. განაახლე Pro-ზე.",
    freeDays: "უფასო პაკეტში შესაძლებელია მაქსიმუმ 5 დღიანი გეგმა.",
  },
  en: {
    freeLimit: "Free plan limit reached. Upgrade to Pro.",
    freeDays: "Free plan supports trips up to 5 days.",
  },
  ru: {
    freeLimit: "Лимит бесплатного плана исчерпан. Перейдите на Pro.",
    freeDays: "Бесплатный план поддерживает поездки до 5 дней.",
  },
};

function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectErrorText(error: unknown): string {
  if (typeof error === "string") return error;
  if (!isRecord(error)) return "";

  const parts: string[] = [];
  const message = error.message;
  const code = error.code;
  const type = error.type;

  if (typeof message === "string") parts.push(message);
  if (typeof code === "string") parts.push(code);
  if (typeof type === "string") parts.push(type);

  if (isRecord(error.error)) {
    parts.push(collectErrorText(error.error));
  }

  return parts.join(" ");
}

function isOpenAiBillingError(error: unknown): boolean {
  const errorText = collectErrorText(error).toLowerCase();
  return (
    errorText.includes("insufficient_quota") ||
    errorText.includes("billing") ||
    errorText.includes("quota")
  );
}

function isTravelStyle(value: unknown): value is TravelStyle {
  return typeof value === "string" && travelStyles.includes(value as TravelStyle);
}

function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && languages.includes(value as Language);
}

function isTimelineType(value: unknown): value is TimelineType {
  return typeof value === "string" && timelineTypes.includes(value as TimelineType);
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function calculateTripDays(startDate: string, endDate: string): number {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const diffTime = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
}

function validateRequestBody(body: unknown): { data: GenerateTripRequest; totalDays: number } | { error: string; status: number } {
  if (!isRecord(body)) {
    return { error: "Invalid request body.", status: 400 };
  }

  const { destination, startDate, endDate, budget, travelers, travelStyle, language } = body;

  if (typeof destination !== "string" || destination.trim().length < 2) {
    return { error: "Destination is required.", status: 400 };
  }

  if (typeof startDate !== "string" || !isIsoDate(startDate)) {
    return { error: "Valid startDate is required.", status: 400 };
  }

  if (typeof endDate !== "string" || !isIsoDate(endDate)) {
    return { error: "Valid endDate is required.", status: 400 };
  }

  const totalDays = calculateTripDays(startDate, endDate);
  if (totalDays < 1) {
    return { error: "endDate must be on or after startDate.", status: 400 };
  }

  if (totalDays > maxTripDays) {
    return { error: "Maximum trip length is 14 days.", status: 400 };
  }

  if (typeof budget !== "number" || !Number.isFinite(budget) || budget <= 0) {
    return { error: "Budget must be a positive number.", status: 400 };
  }

  if (typeof travelers !== "number" || !Number.isFinite(travelers) || travelers <= 0) {
    return { error: "Travelers must be a positive number.", status: 400 };
  }

  if (!isTravelStyle(travelStyle)) {
    return { error: "Invalid travel style.", status: 400 };
  }

  if (!isLanguage(language)) {
    return { error: "Invalid language.", status: 400 };
  }

  return {
    data: {
      destination: destination.trim(),
      startDate,
      endDate,
      budget,
      travelers,
      travelStyle,
      language,
    },
    totalDays,
  };
}

function getEffectiveTripLimit(profile: Profile): number | null {
  if (profile.plan === "agency") return null;
  if (profile.plan === "pro") return 100;
  return profile.monthly_trip_limit;
}

function getPlanLimitError(profile: Profile, language: Language, totalDays: number): string | null {
  if (profile.plan === "free" && totalDays > 5) {
    return limitMessages[language].freeDays;
  }

  const limit = getEffectiveTripLimit(profile);
  if (limit !== null && profile.monthly_trip_count >= limit) {
    return limitMessages[language].freeLimit;
  }

  return null;
}

function getProfileDefaults(user: { id: string; email?: string; user_metadata?: { full_name?: unknown } }): ProfileInsert {
  const metadataName = user.user_metadata?.full_name;
  return {
    id: user.id,
    full_name: typeof metadataName === "string" ? metadataName : user.email ?? null,
    email: user.email ?? null,
    plan: "free",
    monthly_trip_limit: 3,
    monthly_trip_count: 0,
  };
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isTimelineItem(value: unknown): value is TimelineItem {
  if (!isRecord(value)) return false;
  return (
    isString(value.time) &&
    isString(value.title) &&
    isString(value.location) &&
    isString(value.description) &&
    isString(value.duration) &&
    isString(value.cost) &&
    isTimelineType(value.type) &&
    isString(value.tip)
  );
}

function isItineraryDay(value: unknown): value is ItineraryDay {
  if (!isRecord(value) || !Array.isArray(value.timeline)) return false;
  return (
    typeof value.day === "number" &&
    Number.isInteger(value.day) &&
    isString(value.date) &&
    isString(value.title) &&
    isString(value.weather) &&
    typeof value.dailyBudget === "number" &&
    Number.isFinite(value.dailyBudget) &&
    isString(value.aiTip) &&
    value.timeline.length >= 6 &&
    value.timeline.length <= 8 &&
    value.timeline.every(isTimelineItem)
  );
}

function isTripResponse(value: unknown, request: GenerateTripRequest, totalDays: number): value is TripResponse {
  if (!isRecord(value) || !isRecord(value.summary) || !Array.isArray(value.itinerary)) return false;

  const { summary, itinerary } = value;

  return (
    isString(summary.destination) &&
    summary.totalDays === totalDays &&
    summary.travelers === request.travelers &&
    summary.totalBudget === request.budget &&
    typeof summary.averageDailyBudget === "number" &&
    Number.isFinite(summary.averageDailyBudget) &&
    summary.travelStyle === request.travelStyle &&
    itinerary.length === totalDays &&
    itinerary.every((day, index) => isItineraryDay(day) && day.day === index + 1)
  );
}

function buildRequiredSchema(totalDays: number): string {
  return JSON.stringify(
    {
      summary: {
        destination: "Paris",
        totalDays,
        travelers: 2,
        totalBudget: 2000,
        averageDailyBudget: 400,
        travelStyle: "luxury",
      },
      itinerary: [
        {
          day: 1,
          date: "2026-07-12",
          title: "Arrival & First Impressions",
          weather: "☀️",
          dailyBudget: 400,
          aiTip: "Start with outdoor attractions and keep the evening relaxed.",
          timeline: [
            {
              time: "08:00",
              title: "Breakfast",
              location: "Café de Flore",
              description: "Start the morning with a classic Parisian breakfast.",
              duration: "1 hour",
              cost: "25€",
              type: "food",
              tip: "Reserve a table if possible.",
            },
          ],
        },
      ],
    },
    null,
    2,
  );
}

function buildUserPrompt(request: GenerateTripRequest, totalDays: number): string {
  const languageName: Record<Language, string> = {
    ka: "Georgian",
    en: "English",
    ru: "Russian",
  };

  return [
    `Destination: ${request.destination}`,
    `Start date: ${request.startDate}`,
    `End date: ${request.endDate}`,
    `Total days: ${totalDays}`,
    `Total budget: ${request.budget}`,
    `Travelers: ${request.travelers}`,
    `Travel style: ${request.travelStyle}`,
    `Language: ${request.language} (${languageName[request.language]})`,
    "",
    "Required JSON schema:",
    buildRequiredSchema(totalDays),
    "",
    `Generate exactly ${totalDays} itinerary days. For each day, generate 6-8 timeline items.`,
    "Use real place names, restaurant names, attractions and realistic timing.",
    "Avoid repeating the same activity every day.",
    "Divide the total budget across days and keep dailyBudget realistic.",
    "Timeline costs should roughly match each dailyBudget and the selected total budget.",
    "Luxury trips should use premium restaurants, private or curated experiences, and comfortable pacing.",
    "Budget trips should include affordable meals, free attractions, public transport and walking.",
    "Adventure trips should include outdoor and active experiences, nature and movement.",
    "Family trips should be relaxed, child-friendly, and avoid very late activities.",
    "Romantic trips should include scenic views, sunset/evening activities, and intimate restaurants.",
    "Timeline item type must be one of: food, sightseeing, transport, leisure.",
    `All user-facing text values must be in ${languageName[request.language]}.`,
  ].join("\n");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON request body.", 400);
  }

  const validation = validateRequestBody(body);
  if ("error" in validation) {
    return jsonError(validation.error, validation.status);
  }

  if (!process.env.OPENAI_API_KEY) {
    return jsonError("OpenAI API key is not configured.", 500);
  }

  const { data, totalDays } = validation;
  const token = getBearerToken(request);

  if (!token) {
    return jsonError("Authentication required.", 401);
  }

  try {
    const supabase = createServerSupabaseClient(token);
    console.log("SUPABASE URL", process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data: authData, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authData.user) {
      return jsonError("Authentication required.", 401);
    }

    const { error: profilesDiagnosticsError } = await supabaseAdmin.from("profiles").select("*").limit(1);

    if (profilesDiagnosticsError) {
      console.error("Profiles diagnostics query error:", profilesDiagnosticsError);
      return jsonError("Supabase profiles table query failed. Check server logs for details.", 500);
    }

    const { data: existingProfile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") {
      throw profileError;
    }

    const profile =
      existingProfile ??
      (
        await supabaseAdmin
          .from("profiles")
          .insert([getProfileDefaults(authData.user)])
          .select("*")
          .single()
      ).data;

    if (!profile) {
      return jsonError("Unable to create profile.", 500);
    }

    const planLimitError = getPlanLimitError(profile, data.language, totalDays);
    if (planLimitError) {
      return jsonError(planLimitError, 403);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a professional AI travel planner. Return only valid JSON matching the requested schema. Do not include markdown, comments, explanations or text outside JSON. Generate a realistic travel plan based on destination, dates, budget, travelers, travel style and language.",
        },
        {
          role: "user",
          content: buildUserPrompt(data, totalDays),
        },
      ],
    });

    const content = completion.choices[0]?.message.content;
    if (!content) {
      return jsonError("AI did not return a trip plan.", 502);
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(content);
    } catch {
      return jsonError("AI returned invalid JSON.", 500);
    }

    if (!isTripResponse(parsed, data, totalDays)) {
      return jsonError("AI returned an invalid itinerary format.", 500);
    }

    const { error: insertError } = await supabaseAdmin.from("trips").insert({
      user_id: authData.user.id,
      destination: data.destination,
      start_date: data.startDate,
      end_date: data.endDate,
      travelers: data.travelers,
      budget: data.budget,
      travel_style: data.travelStyle,
      language: data.language,
      itinerary_json: parsed,
    });

    if (insertError) {
      throw insertError;
    }

    const { error: usageError } = await supabaseAdmin
      .from("profiles")
      .update({ monthly_trip_count: profile.monthly_trip_count + 1 })
      .eq("id", authData.user.id);

    if (usageError) {
      throw usageError;
    }

    return Response.json(parsed);
  } catch (error) {
    console.error("Generate trip API error:", error);
    if (isOpenAiBillingError(error)) {
      return jsonError(openAiBillingRequiredMessage, 402);
    }

    return jsonError("Failed to generate itinerary.", 500);
  }
}
