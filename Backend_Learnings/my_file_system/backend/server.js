const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (for DELETE requests)
app.use(express.json());

// Route to serve files and directories
app.get('/files/*', (req, res) => {
    const dirPath = path.join(__dirname, '..', req.params[0]);
    fs.stat(dirPath, (err, stats) => {
        if (err) {
            return res.status(404).send('Not Found');
        }
        if (stats.isDirectory()) {
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    return res.status(500).send('Server Error');
                }
                const fileLinks = files.map(file => {
                    const filePath = path.join(req.params[0], file);
                    return `<li><a href="/files/${filePath}">${file}</a> <button onclick="deleteFile('${filePath}')">Delete</button></li>`;
                }).join('');
                res.send(`<ul>${fileLinks}</ul>
                <script>
                    function deleteFile(filePath) {
                        console.log('Attempting to delete:', filePath);
                        fetch('/delete', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ path: filePath })
                        })
                        .then(response => {
                            console.log('Response from delete request:', response);
                            if (response.ok) {
                                window.location.reload();
                            } else {
                                response.text().then(text => {
                                    alert('Failed to delete file: ' + text);
                                });
                            }
                        })
                        .catch(error => {
                            console.error('Error during fetch:', error);
                        });
                    }
                </script>`);
            });
        } else {
            res.sendFile(dirPath);
        }
    });
});

// Route to handle file deletion
app.delete('/delete', (req, res) => {
    console.log('Received delete request:', req.body);
    const filePath = path.join(__dirname, '..', req.body.path);
    console.log(`Attempting to delete file: ${filePath}`);

    // Check if file exists before attempting deletion
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return res.status(400).send('File not found');
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Failed to delete file: ${filePath}`, err);
            return res.status(500).send(`Server Error: ${err.message}`);
        }
        console.log(`Successfully deleted file: ${filePath}`);
        res.status(200).send('File Deleted');
    });
});

// Serve the frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
