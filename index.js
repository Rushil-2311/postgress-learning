const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Joi = require("joi");
app.use(express.json());
const port = 3000;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ Welcome: "how are oyou are you fine or not" });
});

app.listen(port, () => {
  console.log("your app is listening on ", port);
});
