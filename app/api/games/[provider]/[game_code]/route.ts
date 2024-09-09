import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { provider: string; game_code: string } }
) {
  const { provider, game_code } = params;
  const { searchParams } = new URL(request.url);
  const user_code = searchParams.get("user_code") || "test";
  const lang = searchParams.get("lang") || "en";

  const apiResponse = await fetch("https://api.fiverscan.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method: "game_launch",
      agent_code: process.env.FIVERSCAN_AGENT_CODE,
      agent_token: process.env.FIVERSCAN_AGENT_TOKEN,
      user_code,
      provider_code: provider,
      game_code,
      lang,
    }),
  });

  const data = await apiResponse.json();

  return NextResponse.json(data);
}
