1️⃣ What are core modules in Node.js?

Core modules are built-in modules that come with Node.js. They do not require installation.

Examples (10+):

fs

path

http

https

os

events

stream

crypto

buffer

url

util

cluster

child_process

2️⃣ Explain the fs module. Difference between fs and fs/promises
fs

Callback-based API

Traditional async style

fs.readFile("file.txt", (err, data) => {})

fs/promises

Promise-based API

Works cleanly with async/await

await fs.readFile("file.txt", "utf-8");

Key Difference
fs	fs/promises
Callback-based	Promise-based
Older style	Modern async/await
Callback hell possible	Cleaner code
3️⃣ What is the path module used for?

Used to handle and transform file paths in a cross-platform way.

Common uses:

Join paths

Resolve absolute paths

Extract file names / extensions

path.join(__dirname, "data", "file.txt");

4️⃣ Explain the EventEmitter class

EventEmitter allows event-driven programming.

How it works:

Emit events using emit()

Listen using on() or once()

const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("message", data => console.log(data));
emitter.emit("message", "Hello");

5️⃣ Difference between on() and once()
Method	Behavior
on()	Runs every time event fires
once()	Runs only once
6️⃣ Error handling with EventEmitters

Errors should be emitted using the "error" event

If no error listener exists → Node crashes

emitter.on("error", err => console.error(err));
emitter.emit("error", new Error("Something failed"));

7️⃣ What is the cluster module?

Allows Node.js to use multiple CPU cores.

Why use it?

Node is single-threaded

Cluster forks multiple worker processes

Improves performance & scalability

8️⃣ What are child processes?

Used to run external commands or scripts.

When to use:

Heavy computation

Running shell commands

Isolating tasks

9️⃣ Difference between spawn, exec, and fork
Method	Use case
spawn	Streaming large output
exec	Small commands, buffered output
fork	Spawn another Node.js process
🧪 Machine Coding Question
Event-Driven File Watcher
📁 File 1: README.md
# Event-Driven File Watcher

This project watches a directory and emits custom events when files are:
- Added
- Modified
- Deleted

It uses:
- fs.watch()
- EventEmitter
- Node.js core modules only

## How to Run

1. Create a folder named `watched`
2. Run:
   node server.js
3. Add, edit, or delete files inside `watched`

Events will be logged with timestamps.