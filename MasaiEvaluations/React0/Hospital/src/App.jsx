import { useEffect, useState } from "react";

const patients = [
  { id: 1, name: "Ramesh Kumar", age: 45, problem: "Fever and cough", doctor: "Dr. Sharma" },
  { id: 2, name: "Anita Singh", age: 32, problem: "Headache", doctor: "Dr. Mehta" },
  { id: 3, name: "Rahul Verma", age: 28, problem: "Back pain", doctor: "Dr. Rao" },
  { id: 4, name: "Suman Patel", age: 60, problem: "Blood pressure", doctor: "Dr. Shah" }
];

const LS = {
  TREATED: "treatedPatients",
  NOT_TREATED: "notTreatedPatients",
  CURRENT: "currentPatientIndex",
  TIMER: "doctorSessionTimer"
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(Number(localStorage.getItem(LS.CURRENT)) || 0);
  const [treated, setTreated] = useState(JSON.parse(localStorage.getItem(LS.TREATED)) || []);
  const [notTreated, setNotTreated] = useState(JSON.parse(localStorage.getItem(LS.NOT_TREATED)) || []);
  const [timer, setTimer] = useState(Number(localStorage.getItem(LS.TIMER)) || 900);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const total = patients.length;
  const processed = treated.length + notTreated.length;
  const pending = total - processed;
  const isSessionOver = timer <= 0 || processed === total;

  useEffect(() => {
    localStorage.setItem(LS.CURRENT, currentIndex);
    localStorage.setItem(LS.TREATED, JSON.stringify(treated));
    localStorage.setItem(LS.NOT_TREATED, JSON.stringify(notTreated));
    localStorage.setItem(LS.TIMER, timer);
  }, [currentIndex, treated, notTreated, timer]);

  useEffect(() => {
    if (isSessionOver) return;
    const interval = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, [isSessionOver]);

  const currentPatient = patients[currentIndex];
  const isLocked = treated.includes(currentPatient.id) || notTreated.includes(currentPatient.id);

  const markTreated = (status) => {
    if (isLocked || isSessionOver) return;
    if (status === "TREATED") setTreated([...treated, currentPatient.id]);
    else setNotTreated([...notTreated, currentPatient.id]);
  };

  const resetSession = () => {
    localStorage.clear();
    window.location.reload();
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = (processed / total) * 100;

  if (isSessionOver) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
            <h1 className="text-3xl font-bold mb-6">Session Summary</h1>
            <p>Total Patients: {total}</p>
            <p className="text-green-600">Treated: {treated.length}</p>
            <p className="text-red-600">Not Treated: {notTreated.length}</p>
            <p className="text-yellow-600">Pending: {pending}</p>
            <button
              onClick={resetSession}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Reset Session
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4">
          
          <div className="flex flex-col md:flex-row md:justify-between gap-3">
            <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
            <span className="font-mono text-xl text-blue-600">
              ⏱ {formatTime(timer)}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <input
            placeholder="Search patient..."
            className="border w-full p-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2">
            {["ALL", "TREATED", "PENDING"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded-full text-sm ${
                  filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="border rounded-xl p-6 bg-slate-50 shadow-inner">
            <h2 className="font-bold text-xl">{currentPatient.name}</h2>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <p>Age: {currentPatient.age}</p>
              <p>Doctor: {currentPatient.doctor}</p>
            </div>
            <p className="mt-2">Problem: {currentPatient.problem}</p>

            <div className="flex gap-4 mt-4">
              <button
                disabled={isLocked}
                onClick={() => markTreated("TREATED")}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                Treated
              </button>
              <button
                disabled={isLocked}
                onClick={() => markTreated("NOT")}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                Not Treated
              </button>
            </div>

            {isLocked && (
              <p className="text-center text-gray-500 mt-2">Status Locked</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(i => i - 1)}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold">
              {currentIndex + 1} / {total}
            </span>

            <button
              disabled={currentIndex === total - 1}
              onClick={() => setCurrentIndex(i => i + 1)}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-3 text-center text-sm pt-2">
            <p className="text-green-600">Treated: {treated.length}</p>
            <p className="text-red-600">Not: {notTreated.length}</p>
            <p className="text-yellow-600">Pending: {pending}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="font-bold text-lg">🏥 City Hospital</h1>
        <span className="text-sm opacity-80">OPD Management System</span>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-300 text-center py-3 text-sm">
      © {new Date().getFullYear()} City Hospital • React OPD System
    </footer>
  );
}
