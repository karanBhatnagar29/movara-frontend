import type {
  BatchSession,
  ServiceDetail,
  ServiceSummary,
  Testimonial as SiteTestimonial,
} from "@/components/site/types";
import type { ClassBatch, PricingPlan, Service, ServiceDetails, Testimonial } from "@/lib/api";

import yogaImg from "@/assets/service-yoga.jpg";
import pilatesImg from "@/assets/service-pilates.jpg";
import danceImg from "@/assets/service-dance.jpg";
import meditationImg from "@/assets/service-meditation.jpg";
import groupImg from "@/assets/group-yoga.jpg";
import studioImg from "@/assets/studio-interior.jpg";
import whyImg from "@/assets/why-choose.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

const serviceImageMap = {
  "dance-yoga-basics": danceImg,
  "30-day-body-confidence-transformation": groupImg,
  "wedding-transformation-program": studioImg,
  "weekend-dance-fitness-workshop": danceImg,
  "home-transformation-series": meditationImg,
} as const;

const serviceCategoryImageMap = {
  "Beginner Program": yogaImg,
  "Transformation Program": groupImg,
  "Special Program": studioImg,
  Workshop: danceImg,
  "Home Program": meditationImg,
} as const;

const testimonialAvatarPool = [t1, t2, t3];

export function imageForService(service: Pick<Service, "slug" | "category">) {
  return (
    serviceImageMap[service.slug as keyof typeof serviceImageMap] ||
    serviceCategoryImageMap[service.category as keyof typeof serviceCategoryImageMap] ||
    whyImg
  );
}

export function accentForService(
  service: Pick<Service, "slug" | "category" | "delivery_mode">,
): ServiceSummary["accent"] {
  if (service.slug.includes("dance")) {
    return "coral";
  }

  if (service.slug.includes("transformation") || service.category.includes("Transformation")) {
    return "peach";
  }

  if (service.slug.includes("home") || service.delivery_mode === "recorded") {
    return "sky";
  }

  if (service.delivery_mode === "live") {
    return "gold";
  }

  return "mint";
}

export function intensityForService(
  service: Pick<Service, "slug" | "category">,
): ServiceSummary["intensity"] {
  if (service.slug.includes("transformation") || service.category.includes("Transformation")) {
    return "Strong";
  }

  if (service.slug.includes("wedding")) {
    return "Balanced";
  }

  if (service.slug.includes("home")) {
    return "Gentle";
  }

  return "Balanced";
}

export function mapServiceSummary(service: Service): ServiceSummary {
  return {
    id: service.id,
    slug: service.slug,
    title: service.name,
    tagline: service.description,
    category: service.category,
    imageUrl: imageForService(service),
    durationLabel: service.delivery_mode,
    intensity: intensityForService(service),
    accent: accentForService(service),
  };
}

export function mapServiceDetail(service: ServiceDetails): ServiceDetail {
  const galleryCandidates = [imageForService(service), groupImg, studioImg];
  const galleryUrls = galleryCandidates.filter((asset, index, list) => {
    const currentSrc = typeof asset === "string" ? asset : asset.src;
    return (
      list.findIndex((candidate) => {
        const candidateSrc = typeof candidate === "string" ? candidate : candidate.src;
        return candidateSrc === currentSrc;
      }) === index
    );
  });

  return {
    ...mapServiceSummary(service),
    description: service.description,
    highlights: [
      {
        title: "Live and guided",
        description: `Designed for ${service.delivery_mode} delivery with real instructor support where available.`,
      },
      {
        title: "Fits real life",
        description: `Built inside the ${service.category.toLowerCase()} journey so the practice feels sustainable, not random.`,
      },
      {
        title: "Clear next step",
        description:
          "Use a discovery call or live batch to move into the right format with confidence.",
      },
    ],
    outcomes: [
      "Feel stronger and more supported in your routine",
      "Build consistency through a format that matches your life",
      "Move with more confidence, energy, and ease",
      "Choose between guided calls, live batches, and structured support",
    ],
    galleryUrls,
  };
}

export function mapPricingPlan(plan: PricingPlan): import("@/components/site/types").PricingPlan {
  const cadence = plan.duration_label ? ` / ${plan.duration_label}` : "";
  return {
    id: plan.id,
    name: plan.title,
    priceLabel: `₹${plan.price_inr}`,
    cadenceLabel: cadence,
    description: plan.services
      ? `${plan.services.name} · ${plan.services.category}`
      : "Movara plan",
    features: plan.features,
    highlighted: plan.is_popular,
    ctaLabel: plan.is_popular ? "Book a Discovery Call" : "Talk to Movara",
  };
}

export function mapBatch(batch: ClassBatch): BatchSession {
  const service = batch.services;
  const startTime = batch.start_time?.trim();
  const isoTime = (() => {
    if (!startTime) {
      return "09:00:00";
    }

    const match = startTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) {
      return "09:00:00";
    }

    let hour = Number(match[1]);
    const minute = match[2];
    const period = match[3].toUpperCase();

    if (period === "PM" && hour < 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${String(hour).padStart(2, "0")}:${minute}:00`;
  })();

  return {
    id: batch.id,
    title: batch.title,
    instructor: batch.instructor_name,
    category: service?.name || "Live Class",
    level: "All levels",
    startsAt: `${batch.start_date}T${isoTime}`,
    durationMin: 50,
    seatsTotal: batch.max_slots,
    seatsTaken: batch.booked_slots,
    imageUrl: service ? imageForService({ slug: service.slug, category: "" }) : groupImg,
    accent: service
      ? accentForService({ slug: service.slug, category: service.name, delivery_mode: "live" })
      : "coral",
  };
}

export function mapTestimonial(item: Testimonial, index: number): SiteTestimonial {
  return {
    id: item.id,
    name: item.name,
    role: item.role_label ?? undefined,
    avatarUrl: testimonialAvatarPool[index % testimonialAvatarPool.length],
    quote: item.message,
    rating: item.rating,
  };
}
