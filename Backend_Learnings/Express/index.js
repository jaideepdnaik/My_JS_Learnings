const express = require("express");
let app = express();

let port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.use((req, res) => {
//     console.log("Request recieved");
//     // console.log(req);
//     // res.send("Hello World");
//     res.send({
//         name: "Apple", 
//         color: "red"
//     });
// });

app.get("/", (req, res) => {
    res.send("You reached the root path"); 
});

// app.get("/search", (req, res) => {
//     res.send("You reached the search page"); 
// });

// app.get("/help", (req, res) => {
//     res.send("You reached the help page"); 
// });

// app.get("*", (req, res) => {
//     res.send("This path doesn't exist"); 
// });

// app.post("/", (req, res) => {
//     res.send("You reached the post root path");
// });


// app.get("/:username", (req, res) => {
//     console.log(req.params);
//     res.send("Hey! I'm root.");
// });

app.get("/search", (req, res) => {
    console.log(req.query);
    res.send("No results currently");
});