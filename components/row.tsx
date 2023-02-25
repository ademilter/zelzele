"use client";

import { cx } from "@/lib/utils";
import { Item } from "@/lib/types";
import store from "@/stores/list";

interface Props {
  item: Item;
}

export default function Row({ item }: Props) {
  const { setFilter, filter } = store();

  const styleContainer = {
    "1": "from-zinc-100 bg-gradient-to-l text-zinc-900", // 1-1,9
    "2": "from-zinc-100 bg-gradient-to-l text-zinc-900", // 2-2,9
    "3": "from-zinc-100 bg-gradient-to-l text-zinc-900", // 3-3,9
    "4": "from-amber-100 bg-gradient-to-l text-amber-900", // 4-4,9
    "5": "from-orange-100 bg-gradient-to-l text-orange-900", // 5-5,9
    "6": "from-red-100 bg-gradient-to-l text-red-900", // 6-6,9
    "7": "from-red-100 bg-gradient-to-l text-red-900", // 7+
  };

  return (
    <div className="pt-1">
      <div
        className={cx(
          "p-4 md:p-6",
          styleContainer[item.magnitudeFloor as keyof typeof styleContainer]
        )}
      >
        <div className="mx-auto flex max-w-screen-md items-baseline gap-4 md:gap-6">
          <div
            className="rounded-xl bg-black bg-opacity-5 px-2 py-1
           text-xl font-bold tabular-nums md:text-3xl"
          >
            {Number(item.magnitude).toFixed(1)}
          </div>
          <div className="flex flex-col">
            <button
              className="text-left text-xl font-bold md:text-3xl"
              onClick={() => {
                setFilter({
                  ...filter,
                  city: item.province || item.location,
                });
              }}
            >
              {item.province || item.location}
            </button>
            <h5 className="text-xl opacity-60 md:text-2xl">
              {item.district || "-"}
            </h5>
            <div className="mt-0.5 flex items-center gap-1.5 opacity-60">
              <span>{item.depth} km</span>
              <span className="opacity-40">•</span>
              <time dateTime={item.date}>
                {item.dateTimeObj.toFormat("HH:mm")}
              </time>
              <span className="opacity-40">•</span>
              <span>{item.dateTimeObj.toRelative()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
