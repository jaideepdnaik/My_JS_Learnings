const express = require("express");
const path = require("path");
const app = express();

let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    // res.send("This is home page");
    res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", {number : diceValue});
});