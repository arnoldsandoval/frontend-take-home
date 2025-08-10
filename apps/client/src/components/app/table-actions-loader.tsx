import { Skeleton } from "../ui/skeleton";

export const TableActionsLoader = () => {
  return (
    <div className="flex gap-2 items-center">
      <Skeleton className="h-8 w-full bg-gray-100 rounded-sm animate-pulse" />
      <Skeleton className="h-8 w-32 bg-gray-100 rounded-sm animate-pulse" />
    </div>
  );
};
