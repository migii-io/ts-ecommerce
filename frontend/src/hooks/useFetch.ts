
import { useCallback, useEffect, useState } from "react"

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
}

export function useFetch<T>(url: string, options = {}, dependencies: any[] = []) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [value, setValue] = useState<T | undefined>()

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);

    fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
      if (res.ok) return res.json();

      if (res.status === 404) return Promise.reject('Not found');

      return res.json().then(json => Promise.reject(json));
    })
      .then(data => setValue(data as T))
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies);

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}