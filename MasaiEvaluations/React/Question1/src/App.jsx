import { useEffect, useRef, useState } from "react";

const DEFAULT_TIME = 300;

export default function App() {
  const [time, setTime] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isRunning || time === 0 || isEditing) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, time, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleEditConfirm = () => {
    const value = Number(inputRef.current.value);
    if (!isNaN(value) && value >= 0) {
      setTime(value);
    }
    setIsEditing(false);
  };

  const toggleTimer = () => {
    if (time === 0) return;
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsEditing(false);
    setTime(DEFAULT_TIME);
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.timer,
          color: time === 0 ? "#ff4d4f" : "#000",
        }}
        onClick={() => {
          if (!isRunning) setIsEditing(true);
        }}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            defaultValue={time}
            onBlur={handleEditConfirm}
            onKeyDown={(e) => e.key === "Enter" && handleEditConfirm()}
            style={styles.input}
          />
        ) : (
          formatTime(time)
        )}
      </div>

      {time === 0 && <p style={styles.finished}> Time’s up!</p>}

      <div style={styles.buttons}>
        <button onClick={toggleTimer}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "80px",
    gap: "20px",
    fontFamily: "sans-serif",
  },
  timer: {
    fontSize: "64px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  input: {
    fontSize: "48px",
    width: "140px",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    gap: "12px",
  },
  finished: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
};
