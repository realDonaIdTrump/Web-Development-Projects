import express from "express";

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  res.render("index", { dayOfWeek });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
