import axios from "axios";
import { useEffect, useState } from "react";

interface IState {
  isLoading: boolean;
  apiData: any;
  status: any;
  serverError: any;
}

export default function useFetch(query: string) {
  const [getData, setData] = useState<IState>({
    isLoading: false,
    apiData: null,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { data, status } = await axios.get(query);

        if (status === 200) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    fetchData();
  }, [query]);
  return [getData, setData];
}
