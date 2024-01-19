// Libs
import { Table } from "@tanstack/react-table";

// Components
import { Input } from "../ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DataTableSearch<TData>({
  table,
  handleInputChange,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search Country Name"
          value={
            (table.getColumn("officialName")?.getFilterValue() as string) ?? ""
          }
          onChange={handleInputChange}
          className="h-8 w-[150px] lg:w-[250px] placeholder:text-slate-300 rounded-md"
        />
      </div>
    </div>
  );
}
