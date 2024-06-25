const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');
const app = express();
const port = 3000;

// Static files
app.use(express.static(path.join(__dirname, '..')));

// Project folder list
app.use('/', serveIndex(path.join(__dirname, '..'), { icons: true }));

// Fallback to index.html for root request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-end/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
