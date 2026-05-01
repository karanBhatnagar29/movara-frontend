/**
 * Backend-ready content shapes for Movara.
 * Components consume these via props — no real data lives here.
 */

export interface ServiceSummary {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  imageUrl: string;
  durationLabel?: string;
  intensity?: "Gentle" | "Balanced" | "Strong";
  accent?: "coral" | "mint" | "gold" | "sky" | "peach";
}

export interface ServiceDetail extends ServiceSummary {
  description: string;
  highlights: { title: string; description: string }[];
  outcomes: string[];
  galleryUrls: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  priceLabel: string;
  cadenceLabel: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

export interface BatchSession {
  id: string;
  title: string;
  instructor: string;
  instructorAvatarUrl?: string;
  category: string;
  level: "Beginner" | "All levels" | "Intermediate" | "Advanced";
  startsAt: string; // ISO
  durationMin: number;
  seatsTotal: number;
  seatsTaken: number;
  imageUrl: string;
  accent?: "coral" | "mint" | "gold" | "sky" | "peach";
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatarUrl: string;
  quote: string;
  rating?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface MyClassEntry {
  id: string;
  title: string;
  instructor: string;
  startsAt: string;
  durationMin: number;
  status: "upcoming" | "live" | "completed" | "cancelled";
  joinUrl?: string;
  imageUrl?: string;
}
