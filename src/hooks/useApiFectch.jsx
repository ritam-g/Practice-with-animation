// /src/hooks/useApiFetch.js

import { useState, useEffect } from 'react';

// Using TheMealDB as a free, no-key-required API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'; 

const useApiFetch = (endpoint, query = '') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // TheMealDB uses 'php' extensions in its endpoints
      const url = `${BASE_URL}/${endpoint}${query}`; 

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const result = await response.json();
        // The API returns an object with a 'meals' property, which might be null
        setData(result.meals || []); 
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, query]); 

  return { data, isLoading, error };
};

export default useApiFetch;