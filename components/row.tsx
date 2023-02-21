"use client";

import * as React from "react";
import { cx } from "@/lib/utils";
import { DateTime } from "luxon";
import { motion } from "framer-motion";

export interface ItemProps {
  hide: number;
  date: string;
  depth: { value: number; unit: string };
  id: number;
  latitude: number;
  location: {
    district: string;
    city: string;
  };
  longitude: number;
  magnitude: number;
  type: string;
}

export interface RowProps {
  isShow: boolean;
  item: ItemProps;
}

export default function Row({ item, isShow }: RowProps) {
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
    initial: "out",
    animate: isShow ? "in" : "out",
    variants: {
      in: {
        opacity: 1,
      },
      out: {
        opacity: 0,
      },
    },
    transition: {
      duration: 0.23,
    },
  };

  const magnitudeFloor = Math.floor(
    item.magnitude
  ).toString() as keyof typeof styleContainer;

  const dateTime = DateTime.fromSQL(item.date, {
    zone: "Europe/Istanbul",
    locale: "tr",
  });

  return (
    <motion.article
      {...animations}
      className={cx("z-10 w-full pt-1", isShow ? "relative" : "absolute z-0")}
    >
      <div
        className={cx("bg-white p-4 md:p-6", styleContainer[magnitudeFloor])}
      >
        <div className="mx-auto flex max-w-screen-md items-baseline gap-4 md:gap-6">
          <div className="rounded-xl bg-black bg-opacity-5 px-2 py-1 text-xl font-bold tabular-nums md:text-4xl">
            {item.magnitude.toFixed(1)}
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold md:text-4xl">
              {item.location.city}
            </h3>
            <h5 className="text-xl opacity-60 md:text-2xl">
              {item.location.district}
            </h5>
            <time className="mt-0.5 flex opacity-60" dateTime={item.date}>
              {dateTime.toFormat("HH:mm")} (
              {dateTime.toRelative({ style: "short" })})
            </time>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
