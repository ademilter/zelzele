"use client";

import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import Row, { ItemProps } from "@/components/row";
import Filter, { FilterProps } from "@/components/filter";
import Day from "@/components/day";

export default function List() {
  const [data, setData] = useState<{
    lastUpdate: string;
    data: ItemProps[];
  }>({ lastUpdate: "", data: [] });
  const [filter, setFilter] = useState<FilterProps>({ hide: 2 });
  const [loading, setLoading] = useState(false);

  const groupByDay = useMemo(
    () =>
      data.data.reduce((acc, row) => {
        const date = DateTime.fromSQL(row.date, {
          zone: "Europe/Istanbul",
          locale: "tr",
        })
          .startOf("day")
          .toISODate();

        if (!acc[date]) {
          acc[date] = [];
        }

        if (row.magnitude >= filter.hide) {
          acc[date].push(row);
        }

        return acc;
      }, {} as Record<string, ItemProps[]>),
    [data, filter.hide]
  );

  const hasData = Object.values(groupByDay).flatMap((o) => o).length > 0;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api");
      const data = await res.json();
      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoading(false);
    }
  };

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
      {hasData ? (
        <>
          {Object.keys(groupByDay).map((key) => {
            const rows = groupByDay[key];
            return (
              <div key={key}>
                <Day date={key} />
                {rows.map((row: ItemProps) => (
                  <Row key={row.id} item={row} />
                ))}
              </div>
            );
          })}
        </>
      ) : (
        <div className="py-20 text-center">
          <h4 className="text-lg font-medium">
            Bu büyüklükte deprem yok (çok şükür)
          </h4>
          <p className="opacity-60">Son gerçekleşen 100 deprem arasında.</p>
        </div>
      )}

      <Filter
        filter={filter}
        setFilter={setFilter}
        onRefresh={fetchData}
        loading={loading}
      />
    </div>
  );
}
