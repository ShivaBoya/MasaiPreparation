import { useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  const borderColor =
    score <= 1 ? "red" : score <= 3 ? "orange" : "green";

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>Password Strength</h2>

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          border: `2px solid ${borderColor}`,
          marginBottom: 10,
        }}
      />

      <ul>
        <li>{checks.length ? "✓" : "✗"} Minimum 8 characters</li>
        <li>{checks.upper ? "✓" : "✗"} Uppercase letter</li>
        <li>{checks.number ? "✓" : "✗"} Number</li>
        <li>{checks.special ? "✓" : "✗"} Special character</li>
      </ul>
    </div>
  );
}
