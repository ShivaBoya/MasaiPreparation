import { useState } from "react";

function Alert({ type, children, onClose }) {
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  return (
    <div>
      <span>{icons[type]} {children}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
}

function AlertContainer({ alerts, onDismiss }) {
  if (alerts.length === 0) return null;

  return (
    <div>
      {alerts.map(a => (
        <Alert key={a.id} type={a.type} onClose={() => onDismiss(a.id)}>
          {a.message}
        </Alert>
      ))}
    </div>
  );
}

export default function App() {
  const [alerts, setAlerts] = useState([]);

  const showAlerts = () => {
    setAlerts([
      { id: 1, type: "success", message: "Success alert" },
      { id: 2, type: "error", message: "Error alert" },
      { id: 3, type: "warning", message: "Warning alert" },
      { id: 4, type: "info", message: "Info alert" }
    ]);
  };

  const dismiss = id =>
    setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div>
      <button onClick={showAlerts}>Show Sample Alerts</button>
      <AlertContainer alerts={alerts} onDismiss={dismiss} />
    </div>
  );
}
