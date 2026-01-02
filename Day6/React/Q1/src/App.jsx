import { useState, useEffect } from "react";

export default function App() {
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem("widgets");
    return saved
      ? JSON.parse(saved)
      : { stats: true, activity: true, actions: true };
  });

  useEffect(() => {
    localStorage.setItem("widgets", JSON.stringify(widgets));
  }, [widgets]);

  const toggle = key =>
    setWidgets(prev => ({ ...prev, [key]: !prev[key] }));

  if (!widgets.stats && !widgets.activity && !widgets.actions) {
    return (
      <div>
        <h2>Dashboard Widgets</h2>
        <button onClick={() => toggle("stats")}>Toggle User Stats</button>
        <button onClick={() => toggle("activity")}>Toggle Recent Activity</button>
        <button onClick={() => toggle("actions")}>Toggle Quick Actions</button>
        <p>No widgets selected</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Dashboard Widgets</h2>
      <button onClick={() => toggle("stats")}>Toggle User Stats</button>
      <button onClick={() => toggle("activity")}>Toggle Recent Activity</button>
      <button onClick={() => toggle("actions")}>Toggle Quick Actions</button>

      {widgets.stats && <div>User Stats</div>}
      {widgets.activity ? <div>Recent Activity</div> : null}
      {widgets.actions && <div>Quick Actions</div>}
    </div>
  );
}
