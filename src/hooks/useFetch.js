import { useCallback, useEffect, useState } from "react";

const LOG_KEY = "fetch_log";

const useFetch = () => {
  const [_, forceUpdate] = useState(0); 

  useEffect(() => {
  }, []);

  const fetchWithLogger = useCallback(
    async (url, options = {}) => {
      const { method = "GET", body } = options;

      let payload = body;
      if (typeof body === "string") {
        try {
          payload = JSON.parse(body);
        } catch {}
      }

      const saveLog = (logEntry) => {
        try {
          const prev = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
          const next = [...prev, logEntry];
          localStorage.setItem(LOG_KEY, JSON.stringify(next));
        } catch (e) {
          console.error("Failed to write fetch log", e);
        }
      };

      try {
        const response = await fetch(url, options);

        const log = {
          timestamp: new Date().toISOString(),
          url,
          method,
          payload,
          status: response.status,
        };

        saveLog(log);
        return response;
      } catch (err) {
        const log = {
          timestamp: new Date().toISOString(),
          url,
          method,
          payload,
          status: "NETWORK_ERROR",
          error: err.message,
        };

        saveLog(log);
        throw err;
      }
    },
    []
  );

  return fetchWithLogger;
};

export default useFetch;
