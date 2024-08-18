import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const result = await db.query(
    "SELECT country_name,country_code FROM countries"
  );

  let countries = [];
  result.rows.forEach((country) => {
    countries.push({
      countryName: country.country_name,
      countryCode: country.country_code,
    });
  });
  let answer = req.body.country.trim();
  const foundCountry = countries.find(
    (code) => code.countryName.toLowerCase() === answer.toLowerCase()
  );
  // Extract country code if a match is found

  if (foundCountry) {
    await db.query("INSERT INTO visited_countries(country_code) VALUES($1)", [
      foundCountry.countryCode,
    ]);
  } else {
    console.log(error);
  }

  // Redirect to the root URL after processing
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
