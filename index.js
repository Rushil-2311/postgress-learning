const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3001;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// GET Request to root URL (/)
app.get("/", (request, response) => {
  response.json({
    Welcome: "How to create API with Node.js,EXPRESS and PostgreSQL",
  });
});

// Endpoints

app.get("/countries", db.getCountries);
app.get("/countries/:id", db.getCountryById);
app.post("/user", db.createUser);
app.post("/createCategory/:id", db.createCategory);
app.get("/getCategory/:id", db.getCategoryById);
app.get("/getAllBlogs", db.getAllBlog);
app.post("/createblog/:id", db.createBlog);
app.post("/countries", db.createCountry);
app.put("/countries/:id", db.updateCountry);
app.delete("/countries/:id", db.deleteCountry);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
