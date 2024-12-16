import { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../utils/api";

const useFetchData = (url, refreshInterval = 5000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Для предотвращения обновления состояния после размонтирования компонента

    const fetchData = async () => {
      try {
        const result = await fetchDataFromAPI(url);
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData(); // Первый запрос

    const interval = setInterval(fetchData, refreshInterval); // Автообновление

    return () => {
      isMounted = false;
      clearInterval(interval); // Очищаем интервал
    };
  }, [url, refreshInterval]);

  return { data, loading, error };
};

export default useFetchData;
