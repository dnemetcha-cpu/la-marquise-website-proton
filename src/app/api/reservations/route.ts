import { db } from "@/db";
import { reservations } from "@/db/schema";

const requiredFields = ["name", "phone", "email", "date", "time", "guests"] as const;

// Simple in-memory sliding-window rate limiter (per IP, per 10-minute window).
// Sufficient for abuse protection on a single-instance deployment.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

type ReservationBody = Record<string, unknown>;

function valueFrom(body: ReservationBody, field: string) {
  const value = body[field];
  return typeof value === "string" ? value.trim() : "";
}

function validateDate(date: string): boolean {
  const d = new Date(`${date}T12:00:00`);
  return !Number.isNaN(d.getTime());
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many requests. Please try again shortly or call us." }, { status: 429 });
  }

  let body: ReservationBody;
  try {
    body = (await request.json()) as ReservationBody;
  } catch {
    return Response.json({ error: "Please send a valid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Please send a valid request." }, { status: 400 });
  }

  const values = Object.fromEntries(
    requiredFields.map((field) => [field, valueFrom(body, field)])
  ) as Record<(typeof requiredFields)[number], string>;

  const missingField = requiredFields.find((field) => !values[field]);
  if (missingField) {
    return Response.json({ error: `Please provide your ${missingField}.` }, { status: 400 });
  }

  // Field length guards to prevent abuse.
  const fieldLengths: [keyof typeof values, number][] = [["name", 80], ["phone", 30], ["email", 120]];
  for (const [field, max] of fieldLengths) {
    if (values[field].length > max) {
      return Response.json({ error: `Your ${field} is too long.` }, { status: 400 });
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    return Response.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!values.phone.replace(/[^\d+]/g, "").length || values.phone.length < 8) {
    return Response.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }

  if (!validateDate(values.date)) {
    return Response.json({ error: "Please provide a valid reservation date." }, { status: 400 });
  }

  const guests = Number.parseInt(values.guests, 10);
  if (Number.isNaN(guests) || guests < 1 || guests > 50) {
    return Response.json({ error: "Please provide a valid number of guests." }, { status: 400 });
  }

  const allowedLevels = ["gastronomic", "fastfood", "event"];
  const level = valueFrom(body, "level");
  const safeLevel = allowedLevels.includes(level) ? level : "gastronomic";
  const occasion = valueFrom(body, "occasion").slice(0, 160) || null;
  const message = valueFrom(body, "message").slice(0, 1000) || null;

  try {
    const [reservation] = await db.insert(reservations).values({
      ...values,
      guests: String(guests),
      level: safeLevel,
      occasion,
      message,
    }).returning({ id: reservations.id });

    return Response.json({ success: true, id: reservation.id }, { status: 201 });
  } catch (error) {
    console.error("Unable to save reservation", error);
    return Response.json({ error: "We could not save this reservation. Please try again." }, { status: 500 });
  }
}
