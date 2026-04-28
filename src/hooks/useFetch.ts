import { useCallback } from "react";

const LOG_KEY = "fetch_log";

type FetchOptions = RequestInit & {
  body?: any;
};

type LogEntry = {
  timestamp: string;
  url: string;
  method: string;
  payload: any;
  status: number | string;
  error?: string;
};

const useFetch = () => {
  const fetchWithLogger = useCallback(
    async (url: string, options: FetchOptions = {}) => {
      const { method = "GET", body } = options;

      let payload = body;
      if (typeof body === "string") {
        try {
          payload = JSON.parse(body);
        } catch {
          // игнор
        }
      }

      const saveLog = (logEntry: LogEntry) => {
        try {
          const prev: LogEntry[] = JSON.parse(
            localStorage.getItem(LOG_KEY) || "[]"
          );
          const next = [...prev, logEntry];
          localStorage.setItem(LOG_KEY, JSON.stringify(next));
        } catch (e) {
          console.error("Failed to write fetch log", e);
        }
      };

      try {
        const response = await fetch(url, options);

        const log: LogEntry = {
          timestamp: new Date().toISOString(),
          url,
          method,
          payload,
          status: response.status,
        };

        saveLog(log);

        return response;
      } catch (err: any) {
        const log: LogEntry = {
          timestamp: new Date().toISOString(),
          url,
          method,
          payload,
          status: "NETWORK_ERROR",
          error: err?.message,
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
