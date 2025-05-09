import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  var input=req.body;
  var street=input.street;
  var pet=input.pet;
  res.send(`<h1>Your band name is: </h1><p>${street}${pet}</p>`)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});