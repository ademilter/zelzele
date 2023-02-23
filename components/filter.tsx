import { cx } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-gradient-to-t from-zinc-400 pt-20 pb-10">
      {/* container */}
      <div className="flex flex-nowrap items-center gap-3">
        {/* filter */}
        <div className=" flex h-12 items-center rounded-full bg-white p-1 shadow-lg">
          {[1, 3, 5].map((i) => {
            const isSelected = filter.hide === i;

            return (
              <button
                key={i}
                type="button"
                className={cx(
                  "relative h-full cursor-pointer select-none rounded px-4 font-bold",
                  "first:rounded-l-full first:pl-5",
                  "last:rounded-r-full last:pr-5"
                )}
                onClick={() => setFilter({ hide: i })}
              >
                {isSelected && !loading && (
                  <motion.span
                    layoutId="bg"
                    className="absolute left-0 top-0 h-full w-full rounded-full bg-zinc-200"
                    transition={{
                      duration: 0.2,
                    }}
                  />
                )}

                <span className={cx("relative z-10")}>
                  {i !== 1 && <span className="opacity-50">&gt;</span>}
                  {i === 1 ? "Tümü" : i}
                </span>
              </button>
            );
          })}
        </div>

        {/* refresh */}
        <button
          className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 shadow-lg"
          onClick={onRefresh}
        >
          {loading && (
            <motion.span
              layoutId="bg"
              className="absolute inset-1 rounded-full bg-zinc-200"
              transition={{
                duration: 0.2,
              }}
            />
          )}

          <span
            className={cx(loading && "animate-spin")}
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
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
