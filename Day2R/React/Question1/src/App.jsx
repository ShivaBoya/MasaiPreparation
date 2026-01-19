import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Saved ✓");

  useEffect(() => {
    if (!text) {
      setStatus("Saved ✓");
      return;
    }

    setStatus("Saving...");
    const timer = setTimeout(() => {
      console.log("Saved:", text);
      setStatus("Saved ✓");
    }, 2000);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your notes..."
      />
      <p>{status}</p>
    </div>
  );
}
