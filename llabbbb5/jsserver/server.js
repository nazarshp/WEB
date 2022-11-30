const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var mysqlConnection = mysql.createConnection(require('./db.config'));

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection established succesfull");
    } else {
        console.log("Connection failed TwT" + err);
    }
});

// setup server port
const PORT = process.env.PORT || 5151;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


app.post("/shoe", (req, res) => {
    mysqlConnection.query(
        "INSERT INTO shoe(name, size, color, price) values(?,?,?,?)",
        [
            req.body.name,
            req.body.size,
            req.body.color,
            req.body.price,
        ],
        (err, response) => {
            if (!err) {
                res.send("Shoe has been inserted succesfull");
            } else {
                throw err;
            }
        }
    );
});

app.get("/shoe", (req, res) => {
    mysqlConnection.query("SELECT * FROM shoe", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            throw err;
        }
    });
});

app.delete("/shoe/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM shoe WHERE id=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Shoe has been deleted successfully');
        } else {
            throw err;
        }
    })
});

app.put("/shoe/:id", (req, res) => {
    mysqlConnection.query('UPDATE shoe SET name=?, size=?, color=?, price=? WHERE id=?',
        [
            req.body.name,
            req.body.size,
            req.body.color,
            req.body.price,
            req.params.id
        ],
        (err, rows, fields) => {
            if (!err) {
                res.send('Shoe has been updated successfully');
            } else {
                throw err;
            }
        })
});