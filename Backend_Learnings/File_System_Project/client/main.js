const fetch = require('node-fetch').default || fetch; // Polyfill fetch for older browsers

document.addEventListener('DOMContentLoaded', () => {
  const fileList = document.getElementById('file-list');

  // Fetch file list on page load
  fetch('/api/files')
    .then(response => response.json())
    .then(files => {
      const fileLinks = files.map(file => `<li><a href="#" data-file="${file}" onclick="openFile(event)">${file}</a><button onclick="deleteFile('${file}')">Delete</button></li>`);
      fileList.innerHTML = fileLinks.join('');
    })
    .catch(error => {
      console.error('Error fetching files:', error);
      alert('Error retrieving file list. Please try again later.');
    });

  // Function to handle file opening
  function openFile(event) {
    event.preventDefault();
    const fileName = event.target.dataset.file;
    fetch(`/api/open?file=${fileName}`)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`Error opening file: ${response.statusText}`);
        }
      })
      .then(data => {
        // Display file content (replace with your desired logic)
        const fileContent = document.getElementById('file-content');
        fileContent.textContent = data;
      })
      .catch(error => {
        console.error('Error opening file:', error);
        alert('Error opening file. Please try again later.');
      });
  }

  // Function to handle file deletion (uses confirmation)
  function deleteFile(fileName) {
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file: fileName })
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`Error deleting file: ${response.statusText}`);
          }
        })
        .then(message => {
          alert(message); // Display success message
          // Update the file list after successful deletion (optional)
          fetch('/api/files')
            .then(response => response.json())
            .then(updatedFiles => {
              // Update the UI with the new file list
            })
            .catch(error => {
              console.error('Error fetching files after deletion:', error);
            });
        })
        .catch(error => {
          console.error('Error deleting file:', error);
          alert('Error deleting file. Please try again later.');
        });
    }
  }
});
