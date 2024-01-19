import * as React from "react";

// Libs
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Loader2 } from "lucide-react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSearch } from "./data-table-search";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  rowSelection?: RowSelectionState | undefined;
  onRowSelectionChange?: OnChangeFn<RowSelectionState> | undefined;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowSelection,
  onRowSelectionChange,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [query, setQuery] = React.useState("");

  const fuse = React.useMemo(
    () =>
      new Fuse(data, {
        keys: ["officialName"],
        threshold: 0.6,
      }),
    [data, columns]
  );

  const filteredData = React.useMemo(() => {
    if (query && data) {
      const searchResults = fuse.search(query);
      return searchResults.map((result) => result.item);
    } else {
      return data;
    }
  }, [data, fuse, query]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: onRowSelectionChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    table.getColumn("officialName")?.setFilterValue(value);
  };

  return (
    <div className="space-y-4">
      <DataTableSearch table={table} handleInputChange={handleInputChange} />
      <div className="rounded-md h-[45rem] overflow-auto">
        <Table className="relative w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.id === "select" && "text-center",
                        "px-2",
                        `w-${header.getSize()}`
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!loading ? (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    // data-state={row?.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.id.includes("select") && "text-center",
                          "px-2 h-12",
                          `w-${cell.column.getSize()}`
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  <div className="flex justify-center items-center w-full">
                    <Loader2 className="mr-2 h-16 w-16 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
