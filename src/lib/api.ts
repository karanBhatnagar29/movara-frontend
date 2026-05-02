export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type HomepageStat = {
  label: string;
  value: string;
};

export type WhyChooseUsItem = {
  title: string;
  description: string;
};

export type SiteSettings = {
  id: string;
  brand_name: string;
  tagline: string;
  support_email: string | null;
  support_phone: string | null;
  instagram_url: string | null;
  whatsapp_url: string | null;
  address: string | null;
  footer_summary: string | null;
  hero_badge_text: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_primary_cta_label: string | null;
  hero_primary_cta_href: string | null;
  hero_secondary_cta_label: string | null;
  hero_secondary_cta_href: string | null;
  homepage_stats: HomepageStat[];
  why_choose_us_title: string | null;
  why_choose_us_subtitle: string | null;
  why_choose_us_items: WhyChooseUsItem[];
  pricing_preview_title: string | null;
  pricing_preview_subtitle: string | null;
  final_cta_title: string | null;
  final_cta_text: string | null;
  final_cta_primary_label: string | null;
  final_cta_primary_href: string | null;
  final_cta_secondary_label: string | null;
  final_cta_secondary_href: string | null;
  created_at: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  delivery_mode: "online" | "live" | "recorded" | "hybrid";
  is_active: boolean;
  created_at: string;
};

export type PricingPlan = {
  id: string;
  service_id: string;
  title: string;
  price_inr: number;
  duration_label: string;
  sessions_per_week: number | null;
  features: string[];
  is_popular: boolean;
  created_at: string;
  services?: Pick<Service, "id" | "slug" | "name" | "category">;
};

export type ClassBatch = {
  id: string;
  service_id: string;
  title: string;
  instructor_name: string;
  start_date: string;
  end_date: string | null;
  days_of_week: string[];
  start_time: string;
  timezone: string;
  max_slots: number;
  booked_slots: number;
  meeting_platform: string;
  status: string;
  created_at?: string;
  services?: Pick<Service, "id" | "slug" | "name">;
};

export type Instructor = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  image_url: string | null;
  specialties: string[];
  years_experience: number | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role_label: string | null;
  message: string;
  rating: number;
  is_published: boolean;
  created_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type HomepageContent = {
  hero: {
    badge_text: string;
    title: string;
    subtitle: string;
    primary_cta_label: string;
    primary_cta_href: string;
    secondary_cta_label: string;
    secondary_cta_href: string;
    stats: HomepageStat[];
  };
  featured_services: Service[];
  why_choose_us: {
    title: string;
    subtitle: string;
    items: WhyChooseUsItem[];
  };
  pricing_preview: {
    title: string;
    subtitle: string;
    plans: PricingPlan[];
  };
  testimonials: Testimonial[];
  faqs: Faq[];
  final_cta: {
    title: string;
    text: string;
    primary_label: string;
    primary_href: string;
    secondary_label: string;
    secondary_href: string;
  };
  featured_instructors?: Instructor[];
};

export type ServiceDetails = Service & {
  pricing_plans: PricingPlan[];
  class_batches: ClassBatch[];
  instructors?: Instructor[];
};

export type LeadPayload = {
  full_name: string;
  phone: string;
  email?: string;
  goal?: string;
  source?: string;
};

export type EnrollmentPayload = {
  batch_id: string;
  pricing_plan_id?: string | null;
  full_name: string;
  phone: string;
  email?: string;
  goal?: string;
  source?: string;
  notes?: string;
};

export type EnrollmentRecord = {
  id: string;
  batch_id: string;
  booking_id: string | null;
  pricing_plan_id: string | null;
  status: "pending_payment" | "confirmed" | "waitlisted" | "cancelled" | "completed";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  amount_inr: number;
  seat_reserved: boolean;
  access_token: string;
  access_granted_at: string | null;
  created_at: string;
};

export type EnrollmentCreateResult = {
  enrollment: EnrollmentRecord;
  booking: {
    id: string;
    status: string;
    payment_status: string;
    amount_inr: number;
  };
  lead: {
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
  };
  batch: {
    id: string;
    title: string;
    instructor_name: string;
    start_date: string;
    end_date: string | null;
    days_of_week: string[];
    start_time: string;
    timezone: string;
    meeting_platform: string;
  };
};

export type EnrollmentAccess = {
  id: string;
  status: EnrollmentRecord["status"];
  payment_status: EnrollmentRecord["payment_status"];
  amount_inr: number;
  seat_reserved: boolean;
  access_ready: boolean;
  access_granted_at: string | null;
  join_link: string | null;
  join_message: string;
  batch:
    | (ClassBatch & {
        max_slots: number;
        services?: Pick<Service, "id" | "slug" | "name">;
      })
    | null;
  booking: {
    id: string;
    status: string;
    payment_status: string;
    amount_inr: number;
  } | null;
  lead: {
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
  } | null;
};

export type MyClassesLookupResult = {
  leads: Array<{
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
  }>;
  enrollments: Array<{
    id: string;
    lead_id: string;
    booking_id: string | null;
    pricing_plan_id: string | null;
    status: EnrollmentRecord["status"];
    payment_status: EnrollmentRecord["payment_status"];
    attendance_status: "pending" | "attended" | "missed";
    amount_inr: number;
    seat_reserved: boolean;
    access_token: string;
    access_granted_at: string | null;
    access_ready: boolean;
    access_path: string;
    created_at: string;
    batch:
      | (ClassBatch & {
          services?: Pick<Service, "id" | "slug" | "name">;
        })
      | null;
    booking: {
      id: string;
      status: string;
      payment_status: string;
      amount_inr: number;
    } | null;
    pricing_plan: {
      id: string;
      title: string;
      price_inr: number;
    } | null;
    lead: {
      id: string;
      full_name: string;
      phone: string;
      email: string | null;
    } | null;
  }>;
};

const SERVER_API_BASE_URL =
  process.env.BACKEND_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
const CLIENT_PROXY_BASE_URL = "/api/backend/api";

function buildUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined") {
    return `${CLIENT_PROXY_BASE_URL}${normalizedPath}`;
  }

  if (!SERVER_API_BASE_URL) {
    throw new Error("BACKEND_API_BASE_URL is not configured");
  }

  const normalizedBase = SERVER_API_BASE_URL.replace(/\/$/, "");
  return `${normalizedBase}${normalizedPath}`;
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json()) as ApiResponse<T> & {
    error?: string;
    details?: unknown;
  };

  if (!response.ok || !payload.success) {
    const message = payload.message || payload.error || "Request failed";
    throw new Error(message);
  }

  return payload;
}

export function getHomepage() {
  return apiRequest<HomepageContent>("/api/homepage");
}

export function getSiteSettings() {
  return apiRequest<SiteSettings>("/api/site-settings");
}

export function getServices() {
  return apiRequest<Service[]>("/api/services");
}

export function getServiceBySlug(slug: string) {
  return apiRequest<ServiceDetails>(`/api/services/${slug}`);
}

export function getPricing() {
  return apiRequest<PricingPlan[]>("/api/pricing");
}

export function getBatches() {
  return apiRequest<ClassBatch[]>("/api/batches");
}

export function getFaqs() {
  return apiRequest<Faq[]>("/api/faqs");
}

export function getTestimonials() {
  return apiRequest<Testimonial[]>("/api/testimonials");
}

export function createLead(payload: LeadPayload) {
  return apiRequest<{
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
    goal: string | null;
    source: string | null;
    status: string;
    created_at: string;
  }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createEnrollment(payload: EnrollmentPayload) {
  return apiRequest<EnrollmentCreateResult>("/api/enrollments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getEnrollmentAccess(id: string, token: string) {
  return apiRequest<EnrollmentAccess>(
    `/api/enrollments/${id}/access?token=${encodeURIComponent(token)}`,
  );
}

export function lookupMyClasses(payload: { phone: string; email?: string }) {
  return apiRequest<MyClassesLookupResult>("/api/my-classes/lookup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
