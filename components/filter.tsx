import { cx } from "@/lib/utils";
import store from "@/stores/list";

export default function Filter() {
  const { setFilter, fetchData, filter, loading } = store();

  return (
    <div className="dark:from-zinc-950 fixed inset-x-0 bottom-0 z-50 flex items-center justify-center bg-gradient-to-t from-zinc-400 pb-10 pt-20">
      {/* container */}
      <div className="flex flex-nowrap items-center justify-center gap-3">
        {/* city */}
        {filter?.city && (
          <button
            className="dark:bg-zinc-950 flex h-12 w-28 select-none items-center gap-1.5
            rounded-full bg-white px-4 font-semibold shadow-lg md:w-auto"
            onClick={() =>
              setFilter({
                ...filter,
                city: null
              })
            }
          >
            <span className="grow overflow-hidden text-ellipsis">
              {filter.city.replace(/ /g, "\u00a0")}
            </span>
            <svg
              className="-mr-1 shrink-0 opacity-50"
              width="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* filter */}
        <div className="dark:bg-zinc-950 flex h-12 items-center rounded-full bg-white p-1 shadow-lg">
          {[1, 4].map(i => {
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
                  "rounded-full px-4 font-medium transition-all",
                  isSelected &&
                    "bg-zinc-700 text-white dark:bg-zinc-200 dark:text-black"
                )}
                onClick={() =>
                  setFilter({
                    ...filter,
                    hide: i
                  })
                }
              >
                <span className={cx("relative z-10 inline-flex items-center")}>
                  {i !== 1 && (
                    <svg
                      className="-ml-1.5 -mr-1 opacity-50"
                      width="20"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
          className="dark:bg-zinc-950 flex h-12 w-12 shrink-0 cursor-pointer rounded-full bg-white p-1 shadow-lg"
          onClick={fetchData}
          aria-label="Yenile"
        >
          <span
            className={cx(
              "flex h-full w-full items-center justify-center rounded-full transition-all",
              loading &&
                "animate-spin bg-zinc-700 text-white dark:bg-zinc-200 dark:text-black"
            )}
            style={{
              animationDirection: "reverse"
            }}
          >
            <svg
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
