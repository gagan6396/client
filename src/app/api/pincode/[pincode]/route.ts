// app/api/pincode/[pincode]/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { pincode: string } }) {
  const { pincode } = params;

  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: "Invalid PIN code" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    // Set CORS headers
    const headers = {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error("Error fetching PIN code data:", error);
    return NextResponse.json({ error: "Failed to fetch PIN code data" }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}