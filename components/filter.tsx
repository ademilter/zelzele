import * as React from "react";

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
  fetchData: () => Promise<void>;
}

export default function Filter({ filter, setFilter, fetchData }: AllFilterProps) {
  return (
    <div className="fixed left-1/2 bottom-8 z-50 flex -translate-x-1/2 select-none flex-nowrap items-center gap-2 rounded-full bg-white px-6 py-4 shadow-lg">
      <label className="tabular-nums">&gt;{filter.hide}</label>
      <input
        type="range"
        step={1}
        min={1}
        max={6}
        value={filter.hide}
        onChange={(e) => setFilter({ hide: parseInt(e.target.value) })}
      />
      <button
        className="rounded-full bg-sky-600 p-2 text-white shadow-lg"
        onClick={fetchData}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-refresh"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
        </svg>
      </button>
    </div>
  );
}
