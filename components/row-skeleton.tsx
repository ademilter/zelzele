import GhostText from "@/components/ghost-text";

export default function RowSkeleton() {
  return (
    <div className="pt-1">
      <div className="bg-gradient-to-l from-zinc-100 p-4 dark:from-zinc-800 md:p-5">
        <div className="mx-auto flex max-w-screen-md items-baseline gap-4 md:gap-5">
          <div className="rounded-xl bg-zinc-200 px-2 py-1 dark:bg-zinc-700">
            <span className="text-xl font-bold tabular-nums md:text-2xl">
              <GhostText className="bg-transparent">2,4</GhostText>
            </span>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-bold md:text-2xl">
              <GhostText>Kahramanmaraş</GhostText>
            </h3>
            <h5 className="text-xl">
              <GhostText>Nurhak</GhostText>
            </h5>
            <div className="flex items-center md:mt-0.5">
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
