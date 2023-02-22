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
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-gradient-to-t from-zinc-300 pt-20 pb-10">
      <div className="flex flex-nowrap items-center gap-3">
        <div className="flex h-12 items-center rounded-full bg-white p-1 shadow-lg">
          {[1, 3, 5].map((i) => {
            const isSelected = filter.hide === i;
            return (
              <button
                key={i}
                type="button"
                className={cx(
                  "h-full cursor-pointer rounded px-4",
                  "first:rounded-l-full first:pl-5",
                  "last:rounded-r-full last:pr-5",
                  {
                    "bg-zinc-200 font-bold": isSelected,
                  }
                )}
                onClick={() => setFilter({ hide: i })}
              >
                {isSelected && i !== 1 && <>&gt;</>}
                {i === 1 ? "Tümü" : i}
              </button>
            );
          })}
        </div>

        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 shadow-lg"
          onClick={onRefresh}
        >
          <span
            className={cx(
              loading &&
                "flex h-full w-full animate-spin items-center justify-center rounded-full bg-zinc-200"
            )}
          >
            <svg
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
          </span>
        </button>
      </div>
    </div>
  );
}
