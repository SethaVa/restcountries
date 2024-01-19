import { DataTable } from "@/components/table/data-table";
import useFetch from "@/hooks/useFetch";
import { Package2 } from "lucide-react";
import { Link } from "react-router-dom";
import { columns } from "./components/Columns";

import { Loader } from "./components/Loader";

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

  const getDisplayNativeNameArr = (nativeName: any) => {
    if (!nativeName) return [];

    let result = [];
    for (const key in nativeName) {
      result.push(`${nativeName[key]?.common} (${key})`);
    }

    return result;
  };

  const formattedData = (apiData || []).map((x: any) => ({
    flagPng: x?.flags?.png,
    flagAlt: x?.flags?.alt,
    officialName: x?.name?.official || "",
    cca2: x.cca2,
    cca3: x.cca3,
    nativeNameStr:
      getDisplayNativeNameArr(x?.name?.nativeName).join(", ") || " - ",
    nativeNameArr: getDisplayNativeNameArr(x?.name?.nativeName),
    altSpellingsStr: x.altSpellings.join(", "),
    altSpellingsArr: x.altSpellings,
    idd: `${x?.idd?.root ? "(" + x?.idd?.root + ")" : ""} ${
      x?.idd?.suffixes?.length ? x?.idd?.suffixes.join(", ") : " - "
    }`,
  }));

  return (
    <>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 ">
          <Link className="flex items-center gap-2 font-semibold" to="#">
            <Package2 className="h-6 w-6" />
            <span className="">Countries Catalog</span>
          </Link>
          <div className="w-full flex-1"></div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className=" overflow-hidden">
            {isLoading ? (
              <DataTable columns={columns} data={formattedData} />
            ) : (
              <div className="h-[40rem] flex items-center justify-center">
                <Loader />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
