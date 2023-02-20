"use client";

import * as React from "react";
import Row, { RowProps } from "@/components/row";

export default function List() {
  const [data, setData] = React.useState<{
    lastUpdate: string;
    data: RowProps[];
  }>();

  const fetchData = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    console.log(data);
    setData(data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-0.5">
      {data?.data.map((row) => (
        <Row key={row.id} {...row} />
      ))}
    </div>
  );
}
