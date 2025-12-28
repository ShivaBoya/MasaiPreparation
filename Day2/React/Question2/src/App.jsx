import { useEffect, useState } from "react";

export default function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getDeviceType = () => {
    if (size.width < 768) return "Mobile";
    if (size.width <= 1024) return "Tablet";
    return "Desktop";
  };

  return (
    <div style={{ padding: "20px", fontSize: "18px" }}>
      <h2>Window Resize Tracker</h2>
      <p>
        {size.width} x {size.height}
      </p>
      <p>{getDeviceType()}</p>
    </div>
  );
}
