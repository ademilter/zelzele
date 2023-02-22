import * as React from "react";
import { cx } from "@/lib/utils";

export interface FilterProps {
  hide: number;
}

export interface AllFilterProps {
  filter: {
    hide: number;
  };
  theme: boolean;
  setTheme: React.Dispatch<boolean>
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
  theme,
  setTheme,
  onRefresh = () => Promise.resolve(),
  loading = false,
}: AllFilterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-gradient-to-t from-zinc-400 dark:from-zinc-900 pt-20 pb-10">
      {/* container */}
      <div className="flex flex-nowrap items-center gap-3">
        {/* dark mode */}
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-black p-1 shadow-lg"
          onClick={() => {
            setTheme(!theme)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            {
              theme ? (
                <>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/>
                </>
              ) : (
                <>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
                </>
              )
            }
          </svg>


        </button>

        {/* filter */}
        <div className="flex h-12 items-center rounded-full bg-white dark:bg-black p-1 shadow-lg">
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
                    "bg-zinc-200 dark:bg-zinc-800 font-bold": isSelected,
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

        {/* refresh */}
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white dark:bg-black p-1 shadow-lg"
          onClick={onRefresh}
        >
          <span
            className={cx(
              loading &&
              "flex h-full w-full animate-spin items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800"
            )}
            style={{
              animationDirection: "reverse",
            }}
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
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"/>
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
