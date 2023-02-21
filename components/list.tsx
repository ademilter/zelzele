"use client";

import * as React from "react";
import Row, { RowProps } from "@/components/row";
import Filter, { FilterProps } from "@/components/filter";
import { AnimatePresence } from "framer-motion";

export default function List() {
  const [data, setData] = React.useState<{
    lastUpdate: string;
    data: RowProps[];
  }>();
  const [filter, setFilter] = React.useState<FilterProps>({ hide: 2 });

  const filterData = data?.data
    ? data.data.filter((row) => Math.floor(row.magnitude) >= filter.hide)
    : [];

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
    <div className="space-y-1">
      {filterData.length > 0 ? (
        <AnimatePresence mode={"popLayout"}>
          {filterData.map((row) => (
            <Row key={row.id} {...row} />
          ))}
        </AnimatePresence>
      ) : (
        <div className="py-20 text-center">
          <h4 className="text-lg">Bu büyüklükte deprem olmadı</h4>
          <p className="opacity-60">Son gerçekleşen 100 deprem içinde</p>
        </div>
      )}
      <Filter filter={filter} setFilter={setFilter} fetchData={fetchData} />
    </div>
  );
}
