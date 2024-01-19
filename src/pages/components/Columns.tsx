import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CountryColumn = {
  officialName: string;
  cca2: string;
  cca3: string;
  nativeNameStr: string;
  nativeNameArr: string[];
  altSpellingsStr: string;
  altSpellingsArr: string[];
  idd: string;
  flagAlt: string;
  flagPng: string;
};

export const columns: ColumnDef<CountryColumn>[] = [
  {
    accessorKey: "flagPng",
    enableSorting: false,
    header: ({ column }) => (
      <div className="max-w-[5rem] flex items-center justify-center">
        <DataTableColumnHeader column={column} title="Flags" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[5rem] flex items-center justify-center">
        <img
          className="w-10"
          alt={row.getValue("flagAlt")}
          src={row.getValue("flagPng")}
        />
      </div>
    ),
  },
  {
    accessorKey: "officialName",
    header: ({ column }) => (
      <div className="max-w-[15rem]">
        <DataTableColumnHeader column={column} title="Country Name" />
      </div>
    ),
    sortDescFirst: true,
    cell: ({ row }) => (
      <div className="max-w-[15rem]">
        <CellAction data={row.original} />
      </div>
    ),
  },
  {
    accessorKey: "cca2",
    enableSorting: false,
    header: ({ column }) => (
      <div className="max-w-[10rem]">
        <DataTableColumnHeader column={column} title="Country Code(cca2)" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[10rem]">
        <div className="text-center">{row.getValue("cca2")}</div>
      </div>
    ),
  },
  {
    accessorKey: "cca3",
    enableSorting: false,
    header: ({ column }) => (
      <div className="max-w-[10rem]">
        <DataTableColumnHeader column={column} title="Country Code(cca3)" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[10rem]">
        <div className="text-center">{row.getValue("cca3")}</div>
      </div>
    ),
  },
  {
    accessorKey: "nativeNameStr",
    enableSorting: false,
    header: ({ column }) => (
      <div className="max-w-[15rem]">
        <DataTableColumnHeader column={column} title="Native Country Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[15rem] text-left p-0 ">
        {row.original.nativeNameArr.length > 1 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-text p-0 m-0 text-left">
                {row.original.nativeNameStr}
              </TooltipTrigger>
              <TooltipContent className="bg-white w-[10rem]">
                <dl className="">
                  {row.original.nativeNameArr.map((name: string) => (
                    <dt>• {name}</dt>
                  ))}
                </dl>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="p-0">{row.original.nativeNameStr}</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "altSpellingsStr",
    enableSorting: false,
    header: ({ column }) => (
      <div className="max-w-[19rem]">
        <DataTableColumnHeader
          column={column}
          title="Alternative Country Name"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[19rem]">
        {row.original.altSpellingsArr.length > 1 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-text text-left">
                {row.original.altSpellingsStr}
              </TooltipTrigger>
              <TooltipContent className="bg-white min-w-[10rem]">
                <dl>
                  {row.original.altSpellingsArr.map((name: string) => (
                    <dt>• {name}</dt>
                  ))}
                </dl>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="">{row.getValue("altSpellingsStr")}</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "idd",
    enableSorting: false,
    header: ({ column }) => (
      <div className="max-w-[11rem]">
        <DataTableColumnHeader column={column} title="Country Calling Codes " />
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[11rem]">
        <div>{row.getValue("idd")}</div>
      </div>
    ),
  },
];
