//import Movies from '/entities/Movies.js';
// import CrewMemb from './entities/CrewMemb.js';
// import db from './dbConfig.js';
//import mysql from 'mysql/promise';
//import { DB_USERNAME, DB_PASSWORD } from './Const.js';

//import Sequelize from 'sequelize';

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "daisy",
  database: "moviesyst"
});



// const Movie = db.define("Movie", 
// {
//     MovId:{
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     }, 
//     MovTitle:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }, 
//     MovCategory:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }, 
//     MovPubli:{
//         type: Sequelize.DATE,
//         allowNull: false
//     }
// });



// const CrewMemb = db.define("CrewMemb", {
//   CrewId:{
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false
//   },
//   CrewName:{
//       type: Sequelize.STRING,
//       allowNull: false
//   },
//   CrewRole:{
//       type: Sequelize.STRING,
//       allowNull: false
//   },
//   MovId:{
//       type: Sequelize.INTEGER,
//       allowNull: false
//   }
// });





// mysql.createConnection({
//     user : DB_USERNAME,
//     password : DB_PASSWORD
// })
// .then((connection) => {
//     conn = connection
//     return connection.query('CREATE DATABASE IF NOT EXISTS moviesyst')
// })
// .then(() => {
//     return conn.end()
// })
// .catch((err) => {
//     console.warn(err.stack)
// })

//  Movies.hasMany(CrewMemb, {foreignKey: "MovId"});
//  CrewMemb.belongsTo(Movie, {foreignKey: "MovId"});

// db.sync();


app.post("/create", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const category = req.body.category;
  const publi = req.body.publi;

  db.query(
    "INSERT INTO movies (id, title, category, publi) VALUES (?,?,?,?)",
    [id, title, category, publi],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//--

// app.post("/create", (req, res) => {
//   const id = req.body.id;
//   const name = req.body.name;
//   const role = req.body.role;


//   db.query(
//     "INSERT INTO movies (id, name, role) VALUES (?,?,?)",
//     [id, name, role],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// app.get("/movies", (req, res) => {
//   db.query("SELECT * FROM crewmemb", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });


app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});