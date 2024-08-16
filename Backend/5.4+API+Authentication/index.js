import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "hanson";
const yourPassword = "hanson";
const yourAPIKey = "01f6f210-02c4-42b1-8399-5d33eb0cc29c";
const yourBearerToken = "d0a3e21b-a662-496e-b1d5-d5cda14b21ef";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  const response = await axios.get("https://secrets-api.appbrewery.com/random");
  const result = JSON.stringify(response.data);
  res.render("index.ejs",{content:result});
  console.log(response.data);
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  const URL = "https://secrets-api.appbrewery.com/all?page=2";
   const response = await axios.get(URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });

    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content:result});
    console.log(response.data);
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content:result});
    console.log(response.data);

});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  const URL = "https://secrets-api.appbrewery.com/secrets/42";
  const response = await axios.get(URL, {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}`
    },
  });
  const result = JSON.stringify(response.data);
  res.render("index.ejs",{content:result});
  console.log(response.data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
