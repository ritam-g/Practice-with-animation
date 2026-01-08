// Shared axios-based fetch hook for MealDB endpoints
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const useApiFetch = (endpoint, query = '') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const url = `${BASE_URL}/${endpoint}${query}`;
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data?.meals || []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [endpoint, query]);

  return { data, isLoading, error };
};

export default useApiFetch;

