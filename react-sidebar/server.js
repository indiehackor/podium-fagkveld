import path from 'path';
import { fileURLToPath } from 'url';
import express from"express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(express.static("dist"));

app.listen(5000, () => {
  console.log("server started on port http://localhost:5000");
});
