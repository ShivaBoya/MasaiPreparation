1. What is Node.js?

Node.js is a JavaScript runtime built on Chrome’s V8 engine that allows running JS outside the browser (on server).

Difference from browser JS:
Browser JS → DOM, window, alert
Node.js → file system, network, OS, no DOM

2. What is the Event Loop?

The event loop manages execution of async operations.
It continuously checks:

Call stack

Callback queue

Microtask queue
and pushes tasks to stack when it's empty.

3. What is Non-blocking I/O?

Non-blocking I/O means operations like file read, API call don’t stop the main thread.

Node uses:

Event loop

Thread pool (libuv)

Callbacks/Promises

4. Sync vs Async

Synchronous
Blocks execution

fs.readFileSync()


Asynchronous
Non-blocking

fs.readFile()

5. Callbacks & Callback Hell

Callback = function passed to another function.

Callback hell:
Nested callbacks making code unreadable.

6. Promises

Promise represents future value.
States:

pending

fulfilled

rejected

Fixes callback hell using chaining:

.then().then().catch()

7. Async/Await

Syntactic sugar over promises.

Internally:
Still uses .then() but written synchronously.

8. process.nextTick vs setImmediate
nextTick	setImmediate
Runs before event loop	Runs in next cycle
Higher priority	Lower priority
9. Streams

Streams handle large data piece by piece.

Types:

Readable

Writable

Duplex

Transform

10. Buffer

Buffer handles binary data.
Used for files, images, videos.

Machine Coding
File Processing with Streams

Reads large CSV, converts to uppercase, writes new file, tracks progress.

File 1: README.md
# Node.js File Stream Processor

This project reads a large CSV file using streams,
converts each line to uppercase,
writes to a new file,
and shows progress percentage.

## How to Run

1. Create input file:
   input.csv

2. Run server:
   node server.js

3. Open browser:
   http://localhost:3000/process