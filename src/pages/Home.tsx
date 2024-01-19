import { DataTable } from "@/components/table/data-table";
import useFetch from "@/hooks/useFetch";
import { HomeIcon, Package2 } from "lucide-react";
import { Link } from "react-router-dom";
import { columns } from "./components/Columns";
import Modal from "@/components/ui/modal";
import { useState } from "react";

interface IState {
  isLoading: boolean;
  apiData: any;
  status: any;
  serverError: any;
}

export default function Home() {
  const [{ apiData, isLoading, serverError }]: any = useFetch(
    "https://restcountries.com/v3.1/all"
  );

  if (isLoading) return null;
  const getDisplayNativeName = (nativeName: any) => {
    if (!nativeName) return "";

    let result = [];
    for (const key in nativeName) {
      result.push(`${nativeName[key]?.common} (${key})`);
    }

    return result.join(", ");
  };

  const formattedData = (apiData || []).map((x: any) => ({
    flagPng: x?.flags?.png,
    flagAlt: x?.flags?.alt,
    officialName: x?.name?.official || "",
    cca2: x.cca2,
    cca3: x.cca3,
    nativeName: getDisplayNativeName(x?.name?.nativeName),
    altSpellings: x.altSpellings.join(", "),
    idd: `(${x?.idd?.root}) ${
      x?.idd?.suffixes?.length ? x?.idd?.suffixes.join(", ") : " - "
    }`,
  }));

  console.log(formattedData);

  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block ">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" to="#">
                <Package2 className="h-6 w-6" />
                <span className="">Countries Catalog</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900  bg-gray-100 text-gray-900"
                  to="#"
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
              </nav>
            </div>
            c
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 ">
            <Link
              className="lg:hidden flex items-center gap-2 font-semibold"
              to="#"
            >
              <Package2 className="h-6 w-6" />
              <span className="">Countries Catalog</span>
            </Link>
            <div className="w-full flex-1"></div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="">
              <DataTable columns={columns} data={formattedData} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
