import { DateTime } from "luxon";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const date = DateTime.now().toFormat("yyyy-LL-dd");
    const dateTime = DateTime.now().toFormat("yyyy-LL-dd HH:mm:ss");
    const response = await fetch(
      `https://deprem.afad.gov.tr/apiv2/event/filter?start=${date}&end=${dateTime}&orderby=timedesc`
    );
    const data = await response.json();

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
