const express = require("express");
const path = require("path");
const app = express();

const port = 8080;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../Front-end")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-end", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get("/register", (req, res) => {
    let { user, password } = req.query;
    res.send(`Standard GET Response. Welcome ${user}`);
});

app.post("/register", (req, res) => {
    console.log(req.body);
    let { user, password } = req.body;
    res.send(`Standard POST Response. Welcome ${user}`);
});