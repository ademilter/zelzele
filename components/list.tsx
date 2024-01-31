"use client";

import { DateTime } from "luxon";
import { useEffect } from "react";

import Day from "@/components/day";
import Filter from "@/components/filter";
import Row from "@/components/row";
import RowSkeleton from "@/components/row-skeleton";
import { Item } from "@/lib/types";
import store from "@/stores/list";

export default function List() {
  const { setFilter, fetchData, filter, loading } = store();
  const hasData = store(state => state.hasData());
  const groupByDay = store(state => state.groupByDay());

  useEffect(() => {
    const cacheFilter = localStorage.getItem("filter");
    if (cacheFilter) {
      setFilter(JSON.parse(cacheFilter));
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [filter]);

  return (
    <div className="pb-40">
      {loading ? (
        <div>
          <Day date={DateTime.now().toISO()} />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <RowSkeleton key={i} />
          ))}
        </div>
      ) : hasData ? (
        Object.keys(groupByDay).map(key => {
          const rows = groupByDay[key];
          return (
            <div key={key}>
              {rows.length > 0 && <Day date={key} />}
              {rows.map((row: Item, rowIndex) => (
                <Row key={`${rowIndex}`} item={row} />
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
