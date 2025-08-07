import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

export const TableLoader = ({
  withAvatar = true,
  rowsOnly = false,
  rows = 10,
  columns = 4,
}: {
  withAvatar?: boolean;
  rowsOnly?: boolean;
  rows?: number;
  columns?: number;
}) => {
  const tableRows = (
    <>
      {[...Array(rows)].map((_, i) => (
        <TableRow className="h-11" key={i}>
          {[...Array(columns)].map((_, colIndex) => (
            <TableCell key={colIndex}>
              {colIndex === 0 && withAvatar ? (
                <div className="grid grid-cols-[24px_1fr] items-center gap-2">
                  <Skeleton className="size-6 rounded-full" />
                  <Skeleton className="h-3 rounded-full" />
                </div>
              ) : colIndex === columns - 1 ? (
                <Skeleton className="h-3 rounded w-8 ml-auto" />
              ) : (
                <Skeleton className="h-3 rounded" />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  if (rowsOnly) {
    return tableRows;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[...Array(columns)].map((_, index) => (
            <TableHead key={index}>
              {index === columns - 1 ? (
                <span className="sr-only">Actions</span>
              ) : (
                <Skeleton className="h-3 my-1 rounded bg-gray-200 w-16" />
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{tableRows}</TableBody>
    </Table>
  );
};
