import { NextResponse } from "next/server";

const leadWebhookUrl = process.env.LEAD_WEBHOOK_URL;

type LeadPayload = {
  name?: string;
  phone?: string;
  service?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const lead = {
    name: clean(payload.name),
    phone: clean(payload.phone),
    service: clean(payload.service),
    message: clean(payload.message),
    source: "website",
    page: request.headers.get("referer") || "",
    createdAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.phone) {
    return NextResponse.json({ ok: false, error: "MISSING_REQUIRED_FIELDS" }, { status: 400 });
  }

  if (leadWebhookUrl) {
    const response = await fetch(leadWebhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "LEAD_WEBHOOK_FAILED" }, { status: 502 });
    }
  } else {
    console.info("New Min Beauty lead", lead);
  }

  return NextResponse.json({ ok: true });
}
