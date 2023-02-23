"use client";

import { DateTime } from "luxon";

export interface DayProps {
  date: string;
}

export default function Day({ date }: DayProps) {
  const dateTime = DateTime.fromSQL(date, {
    zone: "Europe/Istanbul",
    locale: "tr",
  });

  return (
    <div className="sticky top-0 z-20 bg-white px-4 py-2 shadow">
      <div className="mx-auto max-w-screen-md">
        <h5 className="font-medium uppercase opacity-80">
          {dateTime.toFormat("dd LLLL yyyy")}
        </h5>
      </div>
    </div>
  );
}
