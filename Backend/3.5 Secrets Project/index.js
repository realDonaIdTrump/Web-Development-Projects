//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { warn } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/check", (req, res) => {
  if(req.body['password'] == "ILoveProgramming"){
    res.sendFile(__dirname + "/public/secret.html");
  }else {
    res.status(400).send("Error: Incorrect Password.");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
