import { useState, useEffect } from "react";
import axios from "axios";


export default function useGet(url, initialState = [], params = {}) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(url, { params });
        setData(response.data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, [url, JSON.stringify(params)]);

  return { data, isLoading, error };
}
