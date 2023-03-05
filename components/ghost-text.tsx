import { ReactNode } from "react";

import { cx } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GhostText({ children, className }: Props) {
  return (
    <span
      className={cx(
        "inline-flex origin-left scale-75 rounded-lg bg-zinc-200 text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
