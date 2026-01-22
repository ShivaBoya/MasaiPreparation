import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetch("https://jsonplaceholder.typicode.com/users/1", {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError("Failed to load user");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [retryKey]);

  if (loading) return <h2>Loading...</h2>;

  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => setRetryKey((k) => k + 1)}>Retry</button>
      </div>
    );

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.company.name}</p>
    </div>
  );
}
