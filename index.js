const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const db = require("mysql").createConnection({
  port: 3306,
  host: "node-db.cqjno1n1tkvw.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin12345",
  database: "node-db",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

app.use(express.json());

// connection.connect((err) => {
//   if (err) return console.error(err.message);

//   console.log("Connected to the MySQL server.");
// });

// connection.end((err) => {
//   if (err) return console.error(err.message);

//   console.log("Close the database connection.");
// });

// db.connect(function(err) {
//   if (err) {
//     console.error('⚠️  Error Connecting: ' + err.stack);
//     return;
//   }

//   console.log('✅  Connected as ID: ' + connections.threadId);
// });

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("✅ Server running on port: 3001");
});
