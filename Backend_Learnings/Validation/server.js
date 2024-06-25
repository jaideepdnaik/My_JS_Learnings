const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

//Starting the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

//Putting the index.html file in the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//Handling Post requests
app.post("/submit", (req, res) => {
    const { fullname, phone, email, topic } = req.body;

    let errors = {};

    if (!/^[A-Z]/.test(fullname)) {
        errors.fullname = "Name must start with an uppercase letter. ";
    }
    if (!/^\d{10}$/.test(phone)) {
        errors.phone = 'Phone number must be 10 digits.';
    }
    if (!/@/.test(email)) {
        errors.email = 'Email must contain @.';
    }
    if (topic.trim() === '') {
        errors.topic = 'Topic cannot be empty.';
    }
    if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
    } else {
        res.send("Form submitted successfully.");
    }
});