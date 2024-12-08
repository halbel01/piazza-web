const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (database) => {
  const users = database.collection('users');

router.post('/register', async (request, response) => {
    const { username, email, password } = request.body;
// Utilizing parameters and variables to facilitate the registration procedure
    
    try {
      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
// Maintaining security by visually encrypting one's password
    
    // Creating user
      const userModel = {
        username,
        email,
        password: hashedPassword,
        timeCreated: new Date(),
      };
// Leveraging our User model to generate a new instance comprised of username, email and password
      const docRef = await users.add(userModel);
      response.status(201).json({ id: docRef.id, ...userModel, password: undefined }); 
    } catch (err) {
      response.status(400).send(err.message);
    }
  });
// Excluding the password from our response

router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    try {
      // Finding the user by email
      const userQuery = await users.where('email', '==', email).get();

      if (userQuery.empty) {
        return response.status(404).send('User not found');
      }
// Locating one's email to then deliver a suitable response
      const user = userQuery.docs[0].data();

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
        return response.status(401).send('Incorrect password');
      }
// Employing a comparable method and function to check password
// Displaying a message according to the result

      const token = jwt.sign(
        { id: userQuery.docs[0].id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      response.json({ token });
    } catch (err) {
      response.status(400).send(err.message);
    }
  });

  return router;
};        
// Generating a JWT for the user by employing their unique ID and a secret key
// Establishing a response body for user access to secure API endpoints.
