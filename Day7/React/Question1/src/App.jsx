import { useEffect, useState } from "react";

const products = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Food", "Books"][i % 4],
  price: (Math.random() * 100 + 10).toFixed(2),
}));

export default function App() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(products);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      const result = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(result);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer); // cleanup (important)
  }, [query]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Search Filter</h2>

      <input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isSearching && <p>Searching...</p>}

      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            {p.name} - {p.category} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
