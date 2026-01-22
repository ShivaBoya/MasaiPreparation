import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    theme: "",
    notifications: false,
  });

  const update = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Step {step} / 3</h2>

      {step === 1 && (
        <>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={update}
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={update}
          />
        </>
      )}

      {step === 2 && (
        <>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={update}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={update}
          />
        </>
      )}

      {step === 3 && (
        <>
          <select name="theme" value={formData.theme} onChange={update}>
            <option value="">Select Theme</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>

          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={update}
            />
            Enable Notifications
          </label>

          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </>
      )}

      <div style={{ marginTop: 10 }}>
        {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
        {step < 3 && <button onClick={() => setStep(step + 1)}>Next</button>}
        {step === 3 && <button>Submit</button>}
      </div>
    </div>
  );
}
