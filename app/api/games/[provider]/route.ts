import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  const { provider } = params;

  const apiResponse = await fetch("https://api.fiverscan.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method: "game_list",
      agent_code: process.env.FIVERSCAN_AGENT_CODE,
      agent_token: process.env.FIVERSCAN_AGENT_TOKEN,
      provider_code: provider,
    }),
  });

  const data = await apiResponse.json();

  return NextResponse.json(data);
}
