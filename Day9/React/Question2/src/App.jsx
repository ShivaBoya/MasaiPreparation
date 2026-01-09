import { useState } from "react";

const steps = ["Shipping", "Billing", "Payment", "Review"];

export default function App() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [data, setData] = useState({
    shipping: "",
    billing: "",
    payment: ""
  });

  const isValid = () => {
    if (step === 0) return data.shipping !== "";
    if (step === 1) return data.billing !== "";
    if (step === 2) return data.payment !== "";
    return true;
  };

  const next = () => {
    if (!isValid()) return;
    setCompleted([...new Set([...completed, step])]);
    setStep(step + 1);
  };

  const jumpTo = (i) => {
    if (completed.includes(i)) setStep(i);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Wizard</h3>

      <div>
        {steps.map((s, i) => (
          <button key={i} onClick={() => jumpTo(i)}>
            {s}
          </button>
        ))}
      </div>

      {step === 0 && (
        <input
          placeholder="Shipping Address"
          value={data.shipping}
          onChange={(e) => setData({ ...data, shipping: e.target.value })}
        />
      )}

      {step === 1 && (
        <input
          placeholder="Billing Address"
          value={data.billing}
          onChange={(e) => setData({ ...data, billing: e.target.value })}
        />
      )}

      {step === 2 && (
        <input
          placeholder="Payment Details"
          value={data.payment}
          onChange={(e) => setData({ ...data, payment: e.target.value })}
        />
      )}

      {step === 3 && <pre>{JSON.stringify(data, null, 2)}</pre>}

      {step < 3 && (
        <button onClick={next} disabled={!isValid()}>
          Next
        </button>
      )}

      {!isValid() && <p style={{ color: "red" }}>Invalid step</p>}
    </div>
  );
}
