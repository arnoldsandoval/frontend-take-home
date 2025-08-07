import { cn } from "@/lib/utils";

export function Heading({
  children,
  className,
  level = 1,
  visualLevel,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  visualLevel?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const tagMap = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  } as const;

  const Tag = tagMap[level];
  const styleLevel = visualLevel ?? level;

  const classNames = cn(
    styleLevel === 1 &&
      "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
    styleLevel === 2 &&
      "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
    styleLevel === 3 && "scroll-m-20 text-2xl font-semibold tracking-tight",
    styleLevel === 4 && "text-lg leading-none font-semibold",
    className
  );

  return <Tag className={classNames}>{children}</Tag>;
}
