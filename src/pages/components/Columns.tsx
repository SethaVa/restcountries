import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

export type CountryColumn = {
  officialName: string;
  cca2: string;
  cca3: string;
  nativeName: string;
  altSpellings: string;
  idd: string;
};

export const columns: ColumnDef<CountryColumn>[] = [
  {
    accessorKey: "officialName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country Name" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => <div className="">{row.getValue("officialName")}</div>,
  },
  {
    accessorKey: "cca2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="2 character Country Code" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cca2")}</div>
    ),
  },
  {
    accessorKey: "cca3",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="3 character Country Code" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("cca3")}</div>
    ),
  },
  {
    accessorKey: "nativeName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Native Country Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("nativeName")}</div>,
  },
  {
    accessorKey: "altSpellings",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alternative Country Name" />
    ),
    cell: ({ row }) => (
      <div>
        <div>{row.getValue("altSpellings")}</div>
      </div>
    ),
  },
  {
    accessorKey: "idd",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country Calling Codes " />
    ),
    cell: ({ row }) => <div>{row.getValue("idd")}</div>,
  },
];