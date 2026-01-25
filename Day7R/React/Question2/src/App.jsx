import { useState } from "react";

export default function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);
  const [calcCount, setCalcCount] = useState(0);

  const analyzeNumber = (num) => {
    setCalcCount((c) => c + 1);

    if (num < 1) return { isPrime: false, factors: [], sum: 0 };

    let factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) factors.push(i);
    }

    return {
      isPrime: factors.length === 2,
      factors,
      sum: factors.reduce((a, b) => a + b, 0),
    };
  };

  const result = analyzeNumber(Number(number));

  return (
    <div
      style={{
        padding: 20,
        background: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <h2>Number Analyzer</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={() => setDark((d) => !d)}>
        Toggle Theme
      </button>

      <p>Is Prime: {result.isPrime ? "Yes" : "No"}</p>
      <p>Factors: {result.factors.join(", ")}</p>
      <p>Sum of Factors: {result.sum}</p>

      <p><strong>Calculation Count:</strong> {calcCount}</p>
    </div>
  );
}
