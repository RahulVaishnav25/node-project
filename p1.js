const fs = require("fs");
const express = require("express");
const axios = require("axios");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  try {
    const data = fs.readFileSync("ui.html");
    res.setHeader("Content-type", "text/html");
    res.end(data);
  } catch (error) {
    res.end(error);
  }
});

app.post("/", async (req, res) => {
  const name = req.body.name;
  const data = (await axios.get("https://api.genderize.io/?name=" + name)).data;
  res.status(200);
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gender found</title>
    </head>
    <body>
        <center><h1>Gender found!!!</h1>
        <h2>Gender for ${name} is ${data.gender}</h2></center>
    </body>
    </html>`);
});

const port = parseInt(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
