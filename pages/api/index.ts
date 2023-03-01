import { DateTime } from "luxon";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  // const params = new URL(req.url).searchParams;
  // const start = params.get("start");

  try {
    const format = "yyyy-LL-dd HH:mm:ss";
    const date = DateTime.now();
    const start = date.minus({ days: 2 }).toFormat(format);
    const end = date.toFormat(format);

    const url = new URL("https://deprem.afad.gov.tr/apiv2/event/filter");
    url.searchParams.append("start", start);
    url.searchParams.append("end", end);
    url.searchParams.append("orderby", "timedesc");
    url.searchParams.append("minmag", "3");
    // url.searchParams.append("limit", limit);

    const response = await fetch(url.toString());
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
