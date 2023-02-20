"use client";

import * as React from "react";
import { cx } from "@/lib/utils";
import { DateTime } from "luxon";

export interface RowProps {
  date: string;
  depth: { value: number; unit: string };
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  magnitude: number;
  type: string;
}

export default function Row({
  date,
  depth,
  id,
  latitude,
  location,
  longitude,
  magnitude,
  type,
}: RowProps) {
  const styleContainer = {
    "1": "bg-zinc-100 text-zinc-900", // 1-1,9
    "2": "bg-zinc-100 text-zinc-900", // 2-2,9
    "3": "bg-blue-100 text-blue-900", // 3-3,9
    "4": "bg-yellow-100 text-yellow-900", // 4-4,9
    "5": "bg-amber-100 text-amber-900", // 5-5,9
    "6": "bg-orange-100 text-orange-900", // 6-6,9
    "7": "bg-red-100 text-red-900", // 7+
  };

  const buyuklukInt = Math.floor(
    magnitude
  ).toString() as keyof typeof styleContainer;

  const yerDistrict = location.split(" ")[0].trim();
  let yerCity = location.split(" ")[1].trim();
  yerCity = yerCity.replace("(", "").replace(")", "");

  const relativeDate = DateTime.fromSQL(date).toRelative({
    locale: "tr",
  });

  return (
    <div className={cx("p-6", styleContainer[buyuklukInt])}>
      <div className="mx-auto flex max-w-screen-md items-baseline gap-6">
        <div className="rounded-xl bg-black bg-opacity-5 px-2 py-1 text-4xl font-bold tabular-nums">
          {magnitude}
        </div>
        <div className="flex flex-col">
          <h3 className="text-4xl font-bold">{yerCity}</h3>
          <h5 className="text-2xl opacity-60">{yerDistrict}</h5>
          <time className="mt-0.5 flex opacity-60" dateTime={date}>
            {relativeDate}
          </time>
        </div>
      </div>
    </div>
  );
}
