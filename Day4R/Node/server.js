const fs = require("fs");
const http = require("http");
const readline = require("readline");

http.createServer((req, res) => {
  if (req.url === "/process") {
    const inputFile = "input.csv";
    const outputFile = "output.csv";

    const totalSize = fs.statSync(inputFile).size;
    let processed = 0;

    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    const rl = readline.createInterface({
      input: readStream
    });

    rl.on("line", (line) => {
      processed += Buffer.byteLength(line);
      const percent = ((processed / totalSize) * 100).toFixed(2);
      writeStream.write(line.toUpperCase() + "\n");
      console.log("Progress:", percent + "%");
    });

    rl.on("close", () => {
      res.end("File processed successfully");
    });

    readStream.on("error", () => {
      res.end("Read error");
    });

    writeStream.on("error", () => {
      res.end("Write error");
    });
  }
}).listen(3000);
