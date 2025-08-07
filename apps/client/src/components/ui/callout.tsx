"use client";

import { cn } from "@/lib/utils";

export const Callout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-md border px-4  [&>p]:mt-0.5! [&>p]:font-medium [&>p]:leading-normal pt-1.5 pb-3 border-neutral-100 bg-neutral-100",
        className
      )}
    >
      <span className="text-xs font-medium text-muted uppercase">Note</span>
      {children}
    </div>
  );
};

export default Callout;
