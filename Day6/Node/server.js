const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const watcher = new EventEmitter();
const directory = path.join(__dirname, "watched");

const files = new Map();

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

fs.readdirSync(directory).forEach(file => {
  files.set(file, fs.statSync(path.join(directory, file)).mtimeMs);
});

watcher.on("file-added", file =>
  console.log(`[${new Date().toISOString()}] File added: ${file}`)
);

watcher.on("file-modified", file =>
  console.log(`[${new Date().toISOString()}] File modified: ${file}`)
);

watcher.on("file-deleted", file =>
  console.log(`[${new Date().toISOString()}] File deleted: ${file}`)
);

watcher.on("error", err =>
  console.error("Watcher error:", err.message)
);

fs.watch(directory, (event, filename) => {
  try {
    if (!filename) return;

    const filePath = path.join(directory, filename);

    if (!fs.existsSync(filePath)) {
      if (files.has(filename)) {
        files.delete(filename);
        watcher.emit("file-deleted", filename);
      }
      return;
    }

    const stats = fs.statSync(filePath);
    const prevTime = files.get(filename);

    if (!prevTime) {
      files.set(filename, stats.mtimeMs);
      watcher.emit("file-added", filename);
    } else if (prevTime !== stats.mtimeMs) {
      files.set(filename, stats.mtimeMs);
      watcher.emit("file-modified", filename);
    }
  } catch (err) {
    watcher.emit("error", err);
  }
});

console.log("Watching directory:", directory);
