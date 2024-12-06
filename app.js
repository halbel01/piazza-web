const serverFramework = require('express'); 
const mongoose = require('mongoose');       
const jsonParser = require('body-parser');  
const dotenv = require('dotenv');
// Introducing and importing the required components

if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}

dotenv.config();
// Loading environment parameters from the .env file

const application = serverFramework();
// Declaring and launching the Express application.

application.use(jsonParser.json());
// Employing middleware to interpret JSON requests that are received

const postEndpoints = require('./api/posts'); 
const userEndpoints = require('./api/users'); 
// Introducing and importing the required api routes
// Referencing our 'api' folder with two initialized variables

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};
// Calling the async function to connect to the database
connectToDatabase();
// Initializing a connection with our MongoDB database

application.use('/api/posts', postEndpoints);
application.use('/api/users', userEndpoints);
// Configuring the route endpoints

const SERVER_PORT = process.env.PORT || 3000;
application.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
// Specifying the server port
// Commencing our listening procedure
