import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    setLoading(true);
    setNotFound(false);

    fetch(`https://api.github.com/users/${query}`, {
      signal: controller.signal
    })
      .then(res => {
        if (res.status === 404) throw new Error("notfound");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          setNotFound(true);
          setUser(null);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="GitHub username"
      />
      <button onClick={() => setQuery(input)}>Search</button>

      {loading && <p>Loading...</p>}
      {notFound && <p>User not found</p>}

      {user && !loading && (
        <div>
          <img src={user.avatar_url} alt="" width="100" />
          <h3>{user.name}</h3>
          <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
        </div>
      )}
    </div>
  );
}
