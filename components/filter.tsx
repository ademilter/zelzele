import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import store from "@/stores/list";

export default function Filter() {
  const { setFilter, fetchData, filter, loading } = store();
  const isMobile =
    typeof window !== "undefined" && document.body.clientWidth < 768;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-gradient-to-t from-zinc-400 pt-20 pb-10">
      {/* container */}
      <div className="flex flex-nowrap items-center gap-3">
        {/* filter */}
        <div className="flex h-12 items-center rounded-full bg-white p-1 shadow-lg">
          {[1, 4].map((i) => {
            const isSelected = filter.hide === i;

            return (
              <button
                key={i}
                type="button"
                aria-label={
                  i === 1 ? "Tümünü göster" : `${i} den büyükleri göster`
                }
                className={cx(
                  "relative inline-flex h-full cursor-pointer select-none items-center",
                  "rounded-full px-5 font-bold",
                  isSelected && "bg-zinc-100"
                )}
                onClick={() =>
                  setFilter({
                    ...filter,
                    hide: i,
                  })
                }
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

                <span className={cx("relative z-10 inline-flex items-center")}>
                  {i !== 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-mr-0.5 -ml-1.5 opacity-60"
                      width="20"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  )}
                  <span>{i === 1 ? "Tümü" : i}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* refresh */}
        <button
          className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 shadow-lg"
          onClick={fetchData}
          aria-label="Yenile"
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

        {/* city */}
        {filter?.city && (
          <button
            className="relative flex h-12 cursor-pointer select-none items-center gap-2 rounded-full bg-white px-5 font-bold shadow-lg"
            onClick={() =>
              setFilter({
                ...filter,
                city: null,
              })
            }
          >
            <span>
              {isMobile ? `${filter.city.slice(0, 4)}...` : filter.city}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-[2px]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
