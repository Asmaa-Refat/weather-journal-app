// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// putting all the features of express in app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 5500;  

//function to run the server
app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`);
});

//GET route setup
/* Route = http://localhost:5500/all
*  method = Get
*  functionality = callBack function
*/
// Callback function to complete GET '/all'
app.get('/all', (request, response) => {
    //sending an empty object to be populated with data through API
    response.send(projectData);
});

// POST route setup
/* Route = http://localhost:5500/post
*  method = Post
*  functionality = callBack function
*/
app.post('/post', (request, response)=> {
    projectData = request.body;
    response.send();
});

