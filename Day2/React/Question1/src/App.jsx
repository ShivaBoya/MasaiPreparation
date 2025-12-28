import { useEffect, useState } from "react";

export default function App() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Saved ✓");

  useEffect(() => {
    if (!note) {
      setStatus("Saved ✓");
      return;
    }

    setStatus("Saving...");

    const timer = setTimeout(() => {
      console.log("Saved note:", note);
      setStatus("Saved ✓");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [note]);

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Auto-save Notes</h2>

      <textarea
        rows="6"
        style={{ width: "100%", padding: "10px" }}
        placeholder="Start typing your notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        {status}
      </p>
    </div>
  );
}
