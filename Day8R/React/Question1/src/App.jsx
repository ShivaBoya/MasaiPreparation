import { useRef, useState } from "react";

export default function App() {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const clearOtp = () => {
    setOtp(Array(6).fill(""));
    inputsRef.current[0].focus();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>OTP Input</h2>

      <div style={{ display: "flex", gap: 8 }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            style={{ width: 40, textAlign: "center" }}
          />
        ))}
      </div>

      <p>OTP: {otp.join("")}</p>

      <button onClick={clearOtp}>Clear</button>
    </div>
  );
}
