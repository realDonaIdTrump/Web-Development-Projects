import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "admin",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  
  try {
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (existingUser.rows.length > 0) {
      res.send("Email already exists");
    } else {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      res.render("secrets.ejs");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (existingUser.rows.length > 0) {
      const result = await db.query("SELECT password FROM users WHERE email=$1", [email]);
      const dbPassword = result.rows[0].password;
      console.log(password);
      console.log(dbPassword);
      try {
        if(dbPassword == password){
          res.render("secrets.ejs");
        }else{
          res.send("Password incorrect");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send("Email not exists");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
