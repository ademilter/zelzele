import { parse } from "node-html-parser";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  try {
    const response = await fetch(
      "https://deprem.afad.gov.tr/last-earthquakes.html"
    );
    const data = await response.text();

    const root = parse(data);
    const table = root.querySelector("table tbody");

    const earthquakes: Earthquake[] = [];

    table?.childNodes.forEach((row) => {
      const data = row.childNodes.map((el) => el.text);
      const earthquake = new Earthquake(...data);
      earthquakes.push(earthquake);
    });

    return new Response(
      JSON.stringify({
        lastUpdate: new Date().toISOString(),
        dats: earthquakes,
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

class Earthquake {
  tarih: string;
  enlem: string;
  boylam: string;
  derinlik: string;
  tip: string;
  buyukluk: string;
  yer: string;
  id: string;

  constructor(...props: string[]) {
    this.buyukluk = props[5];
    this.yer = props[6];
    this.tarih = new Date(props[0]).toISOString();
    this.derinlik = props[3];
    this.enlem = props[1];
    this.boylam = props[2];
    this.tip = props[4];
    this.id = props[7];
  }
}
