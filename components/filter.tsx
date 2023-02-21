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
}

export default function Filter({ filter, setFilter }: AllFilterProps) {
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
    </div>
  );
}
