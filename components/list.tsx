"use client";

import { useEffect } from "react";
import { DateTime } from "luxon";
import Filter from "@/components/filter";
import Day from "@/components/day";
import Row from "@/components/row";
import RowSkeleton from "@/components/row-skeleton";
import store from "@/stores/list";
import { Item } from "@/lib/types";

export default function List() {
  const { setFilter, fetchData, filter, loading } = store();
  const hasData = store((state) => state.hasData());
  const groupByDay = store((state) => state.groupByDay());

  useEffect(() => {
    const cacheFilter = localStorage.getItem("filter");
    if (cacheFilter) {
      setFilter(JSON.parse(cacheFilter));
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("filter", filter);
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [filter]);

  return (
    <div className="pb-40">
      {loading ? (
        <div>
          <Day date={DateTime.now().toISODate()} />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      ) : hasData ? (
        Object.keys(groupByDay).map((key) => {
          const rows = groupByDay[key];
          return (
            <div key={key}>
              <Day date={key} />
              {rows.map((row: Item) => (
                <Row key={row.id} item={row} />
              ))}
            </div>
          );
        })
      ) : (
        <div className="py-20 text-center">
          <h4 className="text-lg font-medium">
            Bu büyüklükte deprem yok (çok şükür)
          </h4>
          <p className="opacity-60">Son gerçekleşen 100 deprem arasında.</p>
        </div>
      )}

      <Filter />
    </div>
  );
}
