"use client";

import GhostText from "@/components/ghost-text";

export default function RowSkeleton() {
  return (
    <div className="pt-1">
      <div className="bg-gradient-to-l from-zinc-50 p-4 md:p-6">
        <div className="mx-auto flex max-w-screen-md items-baseline gap-4 md:gap-6">
          <div
            className="rounded-xl bg-black bg-opacity-5 px-2 py-1 text-xl
                font-bold tabular-nums md:text-3xl"
          >
            <GhostText className="bg-transparent">2,4</GhostText>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-bold md:text-3xl">
              <GhostText>Kahramanmaraş</GhostText>
            </h3>
            <h5 className="text-xl md:text-2xl">
              <GhostText>Nurhak</GhostText>
            </h5>
            <div className="mt-0.5 flex items-center">
              <GhostText>7 km</GhostText>
              <GhostText>14:50</GhostText>
              <GhostText>33 dakika önce</GhostText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
