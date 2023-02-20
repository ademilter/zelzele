import { parse } from "muninn";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const response = await fetch(
      "https://deprem.afad.gov.tr/last-earthquakes.html"
    );
    const content = await response.text();

    // https://github.com/aykutkardas/awesome-muninn/blob/main/configs/tr-last-earthquakes.md
    const data = parse(content, {
      selector: ".content-table tbody tr | array",
      schema: {
        id: "td:nth-child(8) | number",
        date: "td:nth-child(1)",
        latitude: "td:nth-child(2) | float",
        longitude: "td:nth-child(3) | float",
        depth: {
          schema: {
            value: "td:nth-child(4) | float",
            unit: { fill: "km" },
          },
        },
        type: "td:nth-child(5)",
        magnitude: "td:nth-child(6) | float",
        location: "td:nth-child(7)",
      },
    });

    return new Response(
      JSON.stringify({
        lastUpdate: new Date().toISOString(),
        data,
      }),
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60",
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
