import { useEffect, useRef, useState } from "react";

export default function App() {
  const sectionsRef = useRef({});
  const [active, setActive] = useState("About");

  const sections = ["About", "Services", "Portfolio", "Contact"];

  const scrollToSection = (name) => {
    sectionsRef.current[name].scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      let current = active;

      sections.forEach((name) => {
        const section = sectionsRef.current[name];
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = name;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "#fff",
          display: "flex",
          gap: 20,
          padding: 10,
        }}
      >
        {sections.map((name) => (
          <button
            key={name}
            onClick={() => scrollToSection(name)}
            style={{
              fontWeight: active === name ? "bold" : "normal",
            }}
          >
            {name}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 60 }}>
        {sections.map((name) => (
          <section
            key={name}
            ref={(el) => (sectionsRef.current[name] = el)}
            style={{ height: "100vh", padding: 20 }}
          >
            <h2>{name}</h2>
          </section>
        ))}
      </div>
    </div>
  );
}
