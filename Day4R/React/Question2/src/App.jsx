import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();
    setLoading(true);
    setError("");
    setUser(null);

    fetch(`https://api.github.com/users/${username}`, {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError("User not found");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="GitHub username"
      />
      <button onClick={() => setUsername(query)}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {user && (
        <div>
          <img src={user.avatar_url} width="100" />
          <h3>{user.name}</h3>
          <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
        </div>
      )}
    </div>
  );
}
