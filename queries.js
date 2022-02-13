const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Rushil3030",
  port: 5432,
});

// CREATE ROUTE FUNCTION TO RETRIEVE ALL RECORDS FROM DATABASE TABLE
const getCountries = (request, response) => {
  pool.query("SELECT * FROM countries ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// CREATE ROUTE FUNCTION TO RETRIEVE A SINGLE RECORD FROM THE DATABASE
const getCountryById = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id);

  pool.query(
    "SELECT * FROM countries WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// CREATE ROUTE FUNCTION TO ADD NEW RECORD INTO THE DATABASE
const createCountry = (request, response) => {
  const { name, capital } = request.body;

  pool.query(
    "INSERT INTO countries (name, capital) VALUES ($1, $2)",
    [name, capital],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("A new country has been added to the database");
    }
  );
};

//create a user for application
const createUser = (req, res) => {
  const { name, username, email, phonenumber, user_avtar } = req.body;
  pool.query(
    "INSERT INTO userdata(name,email,phonenumber,user_avtar,username) VALUES ($1,$2,$3,$4,$5)",
    [name, email, phonenumber, user_avtar, username],
    (error, capital) => {
      if (error) {
        throw error;
      } else {
        res.status(200).send(pool.query("SELECT * FROM userdata"));
      }
    }
  );
};

//create category
const createCategory = (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  pool.query(
    "INSERT INTO category(title,userId) VALUES ($1,$2)",
    [title, id],
    (error, capital) => {
      if (error) {
        throw error;
      } else {
        res.status(200).send("newcategory created successfully");
      }
    }
  );
};

//get category with it users information
const getCategoryById = (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM category LEFT JOIN userdata ON category.userId=userdata.userId WHERE categoryId=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json({ message: result.rows });
      }
    }
  );
};

const createBlog = (req, res) => {
  const { id } = req.params;
  const { title, description, img_url, categoryId, userId } = req.body;
  pool.query(
    "INSERT INTO blog(title,description,img_url,categoryId,userId) VALUES($1,$2,$3,$4,$5)",
    [title, description, img_url, categoryId, id],
    (error, capital) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json({ message: "blog posted successfully" });
      }
    }
  );
};

const getAllBlog = (req, res) => {
  pool.query(
    "select * FROM blog INNER JOIN userdata ON blog.userId=userdata.userId",
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json(result.rows);
      }
    }
  );
};

// CREATE ROUTE FUNCTION TO UPDATE EXISTING DATABASE RECORDS
const updateCountry = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, capital } = request.body;

  pool.query(
    "UPDATE countries SET name = $1, capital = $2 WHERE id = $3",
    [name, capital, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("Country has been updated in the database");
    }
  );
};

// CREATE ROUTE FUNCTION TO DELETE A RECORD FROM THE DATABASE TABLE

const deleteCountry = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM countries WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Country deleted with ID: ${id}`);
  });
};

module.exports = {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  createUser,
  createCategory,
  getCategoryById,
  createBlog,
  getAllBlog,
};
