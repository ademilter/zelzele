import * as React from "react";
import { cx } from "@/lib/utils";

export interface FilterProps {
  hide: number;
}

export interface AllFilterProps {
  filter: {
    hide: number;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      hide: number;
    }>
  >;
  onRefresh: () => Promise<void>;
  loading?: boolean;
}

export default function Filter({
  filter,
  setFilter,
  onRefresh = () => Promise.resolve(),
  loading = false,
}: AllFilterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-gradient-to-t from-white pt-10 pb-10">
      <div className="flex flex-nowrap items-center gap-3">
        <div className="flex h-12 items-center gap-2 rounded-full bg-white shadow-lg">
          {[1, 2, 3, 4, 5].map((i) => {
            const isSelected = filter.hide === i;
            return (
              <button
                key={i}
                type="button"
                className={cx(
                  "h-full px-3 ",
                  "first:rounded-l-full first:pl-5",
                  "last:rounded-r-full last:pr-5",
                  {
                    "bg-zinc-200 font-bold": isSelected,
                  }
                )}
                onClick={() => setFilter({ hide: i })}
              >
                {isSelected && <>&gt;</>}
                {i}
              </button>
            );
          })}
        </div>

        <button
          className={cx(
            "flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg",
            loading && "opacity-50"
          )}
          onClick={onRefresh}
        >
          <svg
            className={cx(loading && "animate-spin")}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
