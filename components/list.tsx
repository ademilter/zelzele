"use client";

import * as React from "react";
import Row, { ItemProps } from "@/components/row";
import Filter, { FilterProps } from "@/components/filter";
import { AnimatePresence } from "framer-motion";
import { DateTime } from "luxon";
import Day from "@/components/day";

export default function List() {
  const [data, setData] = React.useState<{
    lastUpdate: string;
    data: ItemProps[];
  }>({ lastUpdate: "", data: [] });
  const [filter, setFilter] = React.useState<FilterProps>({ hide: 2 });

  const hasData = data.data.length > 0;

  // group by day
  const groupByDay = data.data.reduce((acc, row) => {
    const date = DateTime.fromSQL(row.date).startOf("day").toISODate();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(row);
    return acc;
  }, {} as Record<string, ItemProps[]>);

  const fetchData = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    setData(data);
  };

  React.useEffect(() => {
    const cacheFilter = localStorage.getItem("filter");
    if (cacheFilter) {
      setFilter(JSON.parse(cacheFilter));
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [filter]);

  return (
    <div className="">
      {data.data.length > 0 ? (
        <AnimatePresence mode={"popLayout"}>
          {Object.keys(groupByDay).map((key) => {
            const rows = groupByDay[key];
            return (
              <React.Fragment key={key}>
                <Day date={key} />
                {rows.map((row: ItemProps) => (
                  <Row
                    key={row.id}
                    item={row}
                    isShow={Math.floor(row.magnitude) >= filter.hide}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      ) : (
        <div className="py-20 text-center">
          <h4 className="text-lg">Bu büyüklükte deprem olmadı</h4>
          <p className="opacity-60">Son gerçekleşen 100 deprem içinde</p>
        </div>
      )}

      <Filter filter={filter} setFilter={setFilter} />
    </div>
  );
}
