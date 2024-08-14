import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.locals.header={data:"Enter your name below"};
  res.render("index.ejs");
});

function calLength(req, res, next){
  var fNameLength = req.body["fName"].length;
  var lNameLength= req.body["lName"].length;
  var totalLength = fNameLength+lNameLength;
  res.locals.totalLength = totalLength;
  next();
}

app.post("/submit", calLength,(req, res) => {
  res.locals.header={data:`There are ${res.locals.totalLength} letters in your name`};
  res.render("index.ejs");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
