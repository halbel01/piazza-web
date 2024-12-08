const serverFramework = require('express'); 
const firebaseAdmin = require('firebase-admin');      
const jsonParser = require('body-parser');  
const dotenv = require('dotenv');
// Introducing and importing the required components

if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}

dotenv.config();
// Loading environment parameters from the .env file

firebaseAdmin.declareApp({
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});
// Initializing a connection with our database

const database = firebaseAdmin.database();

const application = serverFramework();
// Declaring and launching the Express application.

application.use(jsonParser.json());
// Employing middleware to interpret JSON requests that are received

const postEndpoints = require('./api/posts'); 
const userEndpoints = require('./api/users'); 
// Introducing and importing the required api routes
// Referencing our 'api' folder with two initialized variables

application.use('/api/posts', postEndpoints);
application.use('/api/users', userEndpoints);
// Configuring the route endpoints

const SERVER_PORT = process.env.PORT || 3000;
application.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
// Specifying the server port
// Commencing our listening procedure
