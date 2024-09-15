import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const { key } = await request.json();

  // Hash the input key
  const hashedKey = crypto.createHash("sha256").update(key).digest("hex");

  // Compare with the stored hashed key
  const isValidKey = hashedKey === process.env.HASHED_DEMO_ACCESS_KEY;

  if (isValidKey) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
