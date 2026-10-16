import { DateTime } from "luxon";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const format = "yyyy-MM-dd'T'HH:mm:ss";
    const date = DateTime.now();
    const start = date.minus({ days: 2 }).toFormat(format);
    const end = date.toFormat(format);

    const url = new URL("https://deprem.afad.gov.tr/apiv2/event/filter");
    url.searchParams.append("start", start);
    url.searchParams.append("end", end);
    url.searchParams.append("orderby", "timedesc");
    url.searchParams.append("minmag", "3");

    const response = await fetch(url.toString());

    if (!response.ok) {
      return res.status(502).json({
        error: `AFAD API HTTP ${response.status}`
      });
    }

    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=60");

    return res.status(200).json({
      lastUpdate: new Date().toISOString(),
      data
    });
  } catch (error) {
    return res.status(502).json({
      error: "AFAD API verileri alınamadı."
    });
  }
}
