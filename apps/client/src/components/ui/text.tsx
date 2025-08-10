import { cn } from "@/lib/utils";

export function Text({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const classNames = cn("leading-7 [&:not(:first-child)]:mt-4", className);

  return <p className={classNames}>{children}</p>;
}
