import { NextRequest, NextResponse } from "next/server";

function getBackendBaseUrl() {
  const baseUrl =
    process.env.BACKEND_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error("BACKEND_API_BASE_URL is not configured");
  }

  return baseUrl.replace(/\/$/, "");
}

type Context = {
  params: Promise<{ path: string[] }>;
};

async function proxy(request: NextRequest, context: Context) {
  try {
    const backendBaseUrl = getBackendBaseUrl();
    const { path } = await context.params;
    const pathname = path.join("/");
    const target = `${backendBaseUrl}/${pathname}${request.nextUrl.search}`;
    const body =
      request.method === "GET" || request.method === "DELETE"
        ? undefined
        : await request.text();

    const upstream = await fetch(target, {
      method: request.method,
      headers: {
        "Content-Type": request.headers.get("content-type") ?? "application/json",
      },
      body: body || undefined,
      cache: "no-store",
    });

    const text = await upstream.text();

    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to proxy backend request";

    return NextResponse.json(
      { success: false, message, data: null },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest, context: Context) {
  return proxy(request, context);
}

export async function POST(request: NextRequest, context: Context) {
  return proxy(request, context);
}

export async function PATCH(request: NextRequest, context: Context) {
  return proxy(request, context);
}

export async function DELETE(request: NextRequest, context: Context) {
  return proxy(request, context);
}
