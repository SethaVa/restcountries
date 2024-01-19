// Libs
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";

// Components
import { Button } from "../ui/button";
import { MdArrowUpward, MdOutlineArrowDownward } from "react-icons/md";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const onSort = () => {
    console.log(column.getIsSorted());
    if (column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc") {
      column.toggleSorting(false);
    } else if (column.getIsSorted() == "asc") {
      column.toggleSorting(true);
    } else if (column.getIsSorted() === "desc") {
      column.toggleSorting(undefined);
    }
  };
  return (
    <div className={cn("flex items-center space-x-2 z-50", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent "
        onClick={column.getToggleSortingHandler()}
      >
        <span>{title}</span>
        {{
          asc: <MdArrowUpward className="ml-2 h-4 w-4" />,
          desc: <MdOutlineArrowDownward className="ml-2 h-4 w-4" />,
        }[column.getIsSorted() as string] ?? null}
      </Button>
    </div>
  );
}
