"use client";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { Input } from "../ui/input";

export const TableActions = ({
  filterPlaceholder,
  end,
}: {
  filterPlaceholder?: string;
  end?: React.ReactNode;
}) => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 300,
  });

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder={filterPlaceholder}
        value={search || ""}
        onChange={(e) => setSearch(e.target.value || null)}
        start={<Search />}
      />
      {end}
    </div>
  );
};
