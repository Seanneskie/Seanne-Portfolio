import { useEffect, useState } from "react";

export interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface NamedError {
  name?: string;
}

const isAbortError = (error: unknown): boolean => {
  if (
    typeof DOMException !== "undefined" &&
    error instanceof DOMException &&
    error.name === "AbortError"
  ) {
    return true;
  }

  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as NamedError).name === "AbortError"
  );
};

/**
 * Fetches JSON data from the public data directory and tracks loading and error state.
 * Aborts the request if the component using the hook unmounts.
 */
export function useData<T>(file: string): UseDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

    setLoading(true);
    setError(null);

    fetch(`${base}/data/${file}`, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        return res.json() as Promise<T>;
      })
      .then((json) => {
        if (abortController.signal.aborted) {
          return;
        }

        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (isAbortError(err)) {
          return;
        }

        const normalizedError = err instanceof Error ? err : new Error(String(err));
        setError(normalizedError);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [file]);

  return { data, loading, error };
}
