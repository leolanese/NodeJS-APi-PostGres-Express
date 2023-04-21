const db = require('./queries');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configure body-parser middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', db.displayHome)
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, (err) => {
  if (err) {
    console.log('Error in server setup');
    console.error(err); // Log the error object for more details
  } else {
    console.log(`App running on port ${port}.`);
    console.log(`Node.js version: ${process.version}`); // Log the Node.js version
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`); // Log the environment (e.g., development, production)
    console.log(`Process ID: ${process.pid}`); // Log the process ID of the running Node.js application
    console.log(`Platform: ${process.platform}`); // Log the platform (e.g., 'darwin', 'win32', 'linux')
    console.log(`Server started at: ${new Date().toLocaleString()}`); // Log the current date and time when the server started
  }
});
