/**
 * Backend-ready content shapes for Movara.
 * Components consume these via props — no real data lives here.
 */

export type MediaAsset = string | { src: string };

export interface ServiceSummary {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  imageUrl: MediaAsset;
  durationLabel?: string;
  intensity?: "Gentle" | "Balanced" | "Strong";
  accent?: "coral" | "mint" | "gold" | "sky" | "peach";
}

export interface ServiceDetail extends ServiceSummary {
  description: string;
  highlights: { title: string; description: string }[];
  outcomes: string[];
  galleryUrls: MediaAsset[];
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
  instructorAvatarUrl?: MediaAsset;
  category: string;
  level: "Beginner" | "All levels" | "Intermediate" | "Advanced";
  startsAt: string; // ISO
  durationMin: number;
  seatsTotal: number;
  seatsTaken: number;
  imageUrl: MediaAsset;
  accent?: "coral" | "mint" | "gold" | "sky" | "peach";
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatarUrl: MediaAsset;
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
  imageUrl?: MediaAsset;
}
