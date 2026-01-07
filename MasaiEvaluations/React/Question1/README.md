
Timer App
Build a countdown timer application in React that demonstrates proper use of the useEffect hook with cleanup functions.

Requirements
1. Timer Display
Display a countdown timer showing minutes and seconds (format: MM:SS)
The default timer should start at 5 minutes (05:00)
Timer should decrement every second when running
2. Editable Time
Users should be able to click on the timer display to edit the time
When clicked, the timer should become an editable input field
Users can enter a new time value in seconds (e.g., entering "120" sets timer to 2 minutes)
After editing, clicking outside the input or pressing Enter should confirm the change
Timer should not run while in edit mode
3. Control Buttons
Start/Stop Toggle Button:

Display "Start" when the timer is stopped
Display "Stop" when the timer is running
Clicking should toggle between running and stopped states
Cannot start if timer is at 00:00
Reset Button:

Should reset the timer back to the default time (5 minutes)
Should stop the timer if it's currently running
4. Timer Behavior
When the timer reaches 00:00, it should automatically stop
The timer should not go below 00:00
Display a visual indication (e.g., different color or message) when timer reaches zero
Technical Requirements
Must Use useEffect Hook
You must implement the timer logic using the useEffect hook. Consider:

How will you handle the interval for counting down?
What dependencies should the effect have?
When should the effect re-run?
Must Implement Cleanup Function
Your useEffect must include a cleanup function to prevent memory leaks. Consider:

What happens when the component unmounts?
What happens when the timer stops?
What needs to be cleaned up when dependencies change?