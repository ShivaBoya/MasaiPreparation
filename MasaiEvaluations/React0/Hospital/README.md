Q: 1
Problem Statement
Hospital Ticket Card Management System (React App)
Create a React-based Hospital Ticket Card App that simulates how patients are registered, queued, and treated in a hospital OPD system.

Features & Functional Requirements
1. Patient Ticket Cards
The app contains multiple Patient Ticket Cards.

Each card represents one patient with:

Patient Name
Age
Problem Description
Assigned Doctor
Only one patient card is active at a time.

2. Card Navigation
Users can move through patients using:

Next Patient
Previous Patient
Current patient index must be displayed.

3. Consultation Status
For every patient:

Mark consultation as:

✅ Treated
❌ Not Treated
Once marked, status should be locked for that patient.

Maintain counters for:

Total Treated
Total Not Treated
4. Doctor Session Timer
A consultation timer (example: 15 minutes) runs for the entire session.

Timer must:

Be visible in UI
Update every second
When timer expires:

Disable further patient updates

Show summary screen containing:

Total patients checked
Treated vs Not Treated count
Pending patients
5. Local Storage Persistence
All progress must persist on refresh using localStorage.

Store:

Current patient index
Treated count
Not treated count
Pending patients
Remaining timer value
App should resume exactly where it stopped.

6. Session Completion Summary
Session ends when:

Timer expires OR
All patients are processed
Display final report:

Total patients
Treated patients
Untreated patients
Pending patients
📌 Sample Patient Data Structure
const patients = [
  {
    id: 1,
    name: "Ramesh Kumar",
    age: 45,
    problem: "Fever and cough",
    doctor: "Dr. Sharma"
  },
  {
    id: 2,
    name: "Anita Singh",
    age: 32,
    problem: "Headache",
    doctor: "Dr. Mehta"
  },
  {
    id: 3,
    name: "Rahul Verma",
    age: 28,
    problem: "Back pain",
    doctor: "Dr. Rao"
  },
  {
    id: 4,
    name: "Suman Patel",
    age: 60,
    problem: "Blood pressure",
    doctor: "Dr. Shah"
  }
];
Local Storage Keys
const localStorageKeys = {
  TREATED: "treatedPatients",
  NOT_TREATED: "notTreatedPatients",
  PENDING: "pendingPatients",
  CURRENT_PATIENT: "currentPatientIndex",
  TIMER: "doctorSessionTimer"
};
⭐ Additional Enhancements
Search patient by name
Filter Treated / Pending
Reset Session button
Progress bar