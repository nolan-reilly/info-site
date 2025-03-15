import http from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";

const PORT = 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filepath;
      if (req.url === "/") {
        filepath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        filepath = path.join(__dirname, "public", "about.html");
      } else if (req.url === "/contact") {
        filepath = path.join(__dirname, "public", "contact.html");
      } else {
        throw new Error("Not found");
      }

      const data = await fs.readFile(filepath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    let filepath = path.join(__dirname, "public", "404.html");

    const data = await fs.readFile(filepath);
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
