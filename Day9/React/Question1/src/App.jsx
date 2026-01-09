import { useState } from "react";

export default function App() {
  const [history, setHistory] = useState([""]);
  const [index, setIndex] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    const newHistory = history.slice(0, index + 1);
    setHistory([...newHistory, value]);
    setIndex(newHistory.length);
  };

  const undo = () => {
    if (index > 0) setIndex(index - 1);
  };

  const redo = () => {
    if (index < history.length - 1) setIndex(index + 1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Undo / Redo Editor</h3>

      <textarea
        rows="5"
        cols="40"
        value={history[index]}
        onChange={handleChange}
      />

      <div>
        <button onClick={undo} disabled={index === 0}>Undo</button>
        <button onClick={redo} disabled={index === history.length - 1}>Redo</button>
      </div>

      <p>History: {index + 1}/{history.length}</p>
    </div>
  );
}
