import { TableActionsLoader } from "@/components/app/table-actions-loader";
import { TableLoader } from "@/components/app/table-loader";

export default function Loading() {
  return (
    <>
      <TableActionsLoader />
      <TableLoader columns={4} />
    </>
  );
}