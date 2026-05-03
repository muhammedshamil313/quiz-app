const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "questions.json";

// READ
app.get("/questions", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

// CREATE
app.post("/questions", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data.push(req.body);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.send("Question Added");
});

// UPDATE
app.put("/questions/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data[req.params.id] = req.body;
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.send("Updated");
});

// DELETE
app.delete("/questions/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data.splice(req.params.id, 1);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));