"use client";

import * as React from "react";
import { cx } from "@/lib/utils";
import { DateTime } from "luxon";
import { motion } from "framer-motion";

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
    "1": "from-zinc-100 bg-gradient-to-l text-zinc-900", // 1-1,9
    "2": "from-zinc-100 bg-gradient-to-l text-zinc-900", // 2-2,9
    "3": "from-blue-100 bg-gradient-to-l text-blue-900", // 3-3,9
    "4": "from-yellow-100 bg-gradient-to-l text-yellow-900", // 4-4,9
    "5": "from-amber-100 bg-gradient-to-l text-amber-900", // 5-5,9
    "6": "from-orange-100 bg-gradient-to-l text-orange-900", // 6-6,9
    "7": "from-red-100 bg-gradient-to-l text-red-900", // 7+
  };

  const animations = {
    layout: true,
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        ease: "easeIn",
        duration: 0.13,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.13,
      },
    },
  };

  const magnitudeFloor = Math.floor(
    magnitude
  ).toString() as keyof typeof styleContainer;

  const yerDistrict = location.split(" ")[0].trim();
  let yerCity = location.split(" ")[1].trim();
  yerCity = yerCity.replace("(", "").replace(")", "");

  const relativeDate = DateTime.fromSQL(date, {
    zone: "Europe/Istanbul",
  }).toRelative({
    locale: "tr",
  });

  return (
    <motion.article {...animations}>
      <div className={cx("p-4 md:p-6", styleContainer[magnitudeFloor])}>
        <div className="mx-auto flex max-w-screen-md items-baseline gap-4 md:gap-6">
          <div className="rounded-xl bg-black bg-opacity-5 px-2 py-1 text-2xl font-bold tabular-nums md:text-4xl">
            {magnitude.toFixed(1)}
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold md:text-4xl">{yerCity}</h3>
            <h5 className="text-xl opacity-60 md:text-2xl">{yerDistrict}</h5>
            <time className="mt-0.5 flex opacity-60" dateTime={date}>
              {relativeDate}
            </time>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
