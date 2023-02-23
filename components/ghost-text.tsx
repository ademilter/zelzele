"use client";

import { cx } from "@/lib/utils";

export default function GhostText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex origin-left scale-75 rounded-lg bg-zinc-100 text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
