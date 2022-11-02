const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const Clarifai = require('clarifai');
const {v4} = require('uuid')
require('dotenv').config();

const db = knex({

  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});


const app = express();
app.use(cors());
const PORT = 6001;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("running");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
});


app.post("/register", (req, res) => {
  const { name, email, password, confirmPass } = req.body;
  if (!email || !name || !password || !confirmPass) {
    return res.status(400).json("incorrect form submission");
  }
  if(password != confirmPass) {
    return res.status(403).json("password not confirmed");
  }

  const hash = bcrypt.hashSync(password);
  db.select('email').from('login').where('email', '=', email)
  .then((data) => {
    if (data.length !== 0) {
      return res.status(400).json('already exists')
    }

    db.insert({
      email: email,
      hash: hash
    }).into('login')
    .returning('email')
    .then(async loginEmail => {
      const users = await db.insert({
        id: v4(),
        email: loginEmail[0],
        name,
      }).into('users').returning('*');
      return res.json(users[0]); 
    })
  }).catch(e => {
    console.error(e)
    return res.status(400).json('unable to register')
  }) 
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch((err) => res.status(404).json("Error getting user"));
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => { return res.status(200).json(entries[0])})
    .catch((err) => res.status(400).json("unable to get entries"));
});

// IMAGE RECOGNITION USING CLARIFAI API
app.post("/imageurl", (req, res) => {
  const app = new Clarifai.App({
    apiKey:"c484df470a3d45d090add24eb8849c81" , 
  });
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(`unable to work with API ${err}`));
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

