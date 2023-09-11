import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = (url, options) => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchApi = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await axios(url, options);
      setData(response.data.data);
    } catch (error) {
      setError(error.response.data.errors);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return {
    isloading,
    error,
    data,
    fetchApi,
  };
};

export default useFetch;
