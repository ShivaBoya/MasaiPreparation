import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [postsError, setPostsError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const controller = new AbortController();
    setUsersLoading(true);
    setUsersError(null);

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        if (err.name !== "AbortError") setUsersError(err.message);
      })
      .finally(() => setUsersLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setPosts([]);
      return;
    }

    const controller = new AbortController();
    setPostsLoading(true);
    setPostsError(null);

    fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => {
        if (err.name !== "AbortError") setPostsError(err.message);
      })
      .finally(() => setPostsLoading(false));

    return () => controller.abort();
  }, [selectedUserId]);

  const sortedPosts = [...posts].sort((a, b) => {
    const t1 = a.title.toLowerCase();
    const t2 = b.title.toLowerCase();
    return sortOrder === "asc"
      ? t1.localeCompare(t2)
      : t2.localeCompare(t1);
  });

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div style={styles.container}>
      <h1>User Posts Viewer</h1>

      {usersLoading && <p>Loading users...</p>}
      {usersError && <p style={styles.error}>{usersError}</p>}

      {!usersLoading && (
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={styles.select}
        >
          <option value="">Select a user...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}

      {!selectedUserId && <p>Please select a user to view posts</p>}

      {postsLoading && <p>Loading posts...</p>}
      {postsError && <p style={styles.error}>{postsError}</p>}

      {selectedUserId && posts.length > 0 && !postsLoading && (
        <>
          <div style={styles.header}>
            <p>Total Posts: {posts.length}</p>
            <button onClick={toggleSort}>
              Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </button>
          </div>

          <div style={styles.posts}>
            {sortedPosts.map((post) => (
              <div key={post.id} style={styles.post}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    fontFamily: "sans-serif",
  },
  select: {
    padding: "8px",
    width: "100%",
    marginBottom: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  posts: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  post: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },
  error: {
    color: "red",
  },
};
