import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  start?: React.ReactNode;
}

function Input({ className, type, start, ...props }: InputProps) {
  return (
    <div className="relative block flex-1">
      {start && (
        <div
          data-slot="start"
          className="absolute left-0 top-0 bottom-0 flex items-center justify-center px-3 [&>svg]:size-3.5 color-[hsla(218,100%,4%,0.62)] pointer-events-none"
        >
          {start}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-input-placeholder selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-8 w-full min-w-0 rounded-sm border bg-transparent px-3 py-0 text-base inset-shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          start && "pl-8",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
