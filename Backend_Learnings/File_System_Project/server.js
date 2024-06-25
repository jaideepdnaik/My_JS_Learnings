const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Route to handle file listing (GET request)
app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'client'); // Change this if needed
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.json(files); // Send list of files
  });
});

// Route to handle file opening (GET request with query parameter)
app.get('/api/open', (req, res) => {
  const filePath = path.join(__dirname, 'client', req.query.file);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File Not Found');
    }
    res.send(data); // Send file content
  });
});

// Route to handle file deletion (DELETE request)
app.delete('/api/delete', (req, res) => {
  const filePath = path.join(__dirname, 'client', req.body.file);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.status(200).send('File Deleted'); // Success message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
