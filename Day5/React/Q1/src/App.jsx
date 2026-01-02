import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch("https://jsonplaceholder.typicode.com/users/1", {
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(user => {
        setData(user);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [retryKey]);

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div>
        <p>Error loading user</p>
        <button onClick={() => setRetryKey(k => k + 1)}>Retry</button>
      </div>
    );

  if (!data) return null;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <p>{data.phone}</p>
    </div>
  );
}
