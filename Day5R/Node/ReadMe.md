1️⃣ What is Node.js? How does it differ from browser JavaScript?

Node.js is a runtime environment that allows JavaScript to run outside the browser using the V8 engine.

Differences:

Browser JS → DOM, window, UI-related APIs

Node.js → filesystem, network, OS-level APIs

Node.js is used for servers, APIs, CLI tools

2️⃣ What is the event loop in Node.js?

The event loop is a mechanism that handles asynchronous operations by executing callbacks from different queues.

Phases (simplified):

Timers (setTimeout)

I/O callbacks

Poll (fetch new I/O)

Check (setImmediate)

Close callbacks

3️⃣ What is non-blocking I/O? How does Node.js achieve it?

Non-blocking I/O allows operations to start and continue without waiting for completion.

Node.js achieves this using:

Event loop

Callbacks / Promises

Libuv thread pool for heavy I/O

4️⃣ Difference between synchronous and asynchronous code
Synchronous	Asynchronous
Blocks execution	Non-blocking
Slower for I/O	Efficient
Easy to reason	Needs callbacks/promises
5️⃣ What are callbacks? What is callback hell?

Callbacks are functions passed as arguments and executed later.

Callback hell occurs when callbacks are nested deeply, making code unreadable and hard to maintain.

6️⃣ What are Promises? How do they solve callback hell?

Promises represent a future value.

They:

Flatten nested callbacks

Improve readability

Support chaining with .then()

7️⃣ What is async/await? How does it work internally?

async/await is syntactic sugar over Promises.

Internally:

await pauses function execution

Resumes when Promise resolves

Uses microtask queue

8️⃣ Difference between process.nextTick() and setImmediate()
process.nextTick	setImmediate
Executes before event loop continues	Executes in check phase
Higher priority	Lower priority
Can starve event loop	Safer
9️⃣ What are streams in Node.js? Types of streams

Streams handle large data efficiently.

Types:

Readable

Writable

Duplex

Transform

🔟 What is Buffer class?

Buffer handles binary data directly in memory.

Used for:

Files

Network packets

Streams

🧪 Machine Coding Question
File Processing with Streams
📁 File 1: README.md
# File Processing with Streams

This project exposes an API endpoint that:
- Reads a large CSV file using streams
- Converts each line to uppercase
- Writes the output to a new file
- Tracks progress percentage
- Handles errors properly

## Setup

1. Place a CSV file named `input.csv` in the project root
2. Run:
   node server.js
3. Call the API:
   GET http://localhost:3000/process