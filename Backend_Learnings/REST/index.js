const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const {v4 : uuidv4} = require("uuid");
uuidv4();

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Jaideep",
        content: "I'm from server side"
    },
    {
        id: uuidv4(),
        username: "Nishanth",
        content: "I'm from Web"
    },
    {
        id: uuidv4(),
        username: "Manish",
        content: "I'm from Unity"
    },
];

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/posts`);
});

app.get("/", (req, res) => {
    res.send("Please go to /posts or /posts/new.")
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

//Create New Route
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

// Patch request
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

//Edit request
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});


// Delete Route.
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});