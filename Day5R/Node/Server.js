const express = require("express");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const app = express();
const PORT = 3000;

const inputFile = path.join(__dirname, "input.csv");
const outputFile = path.join(__dirname, "output.csv");

app.get("/process", async (req, res) => {
  try {
    const totalSize = fs.statSync(inputFile).size;
    let processedSize = 0;

    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    const rl = readline.createInterface({
      input: readStream
    });

    readStream.on("data", chunk => {
      processedSize += chunk.length;
    });

    rl.on("line", line => {
      writeStream.write(line.toUpperCase() + "\n");
    });

    rl.on("close", () => {
      writeStream.end();
      res.json({ progress: "100%" });
    });

    readStream.on("error", err => {
      res.status(500).json({ error: err.message });
    });

    writeStream.on("error", err => {
      res.status(500).json({ error: err.message });
    });

    const interval = setInterval(() => {
      const percent = Math.min(
        Math.round((processedSize / totalSize) * 100),
        100
      );
      console.log(`Progress: ${percent}%`);
      if (percent === 100) clearInterval(interval);
    }, 500);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
