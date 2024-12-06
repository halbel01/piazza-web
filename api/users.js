const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/schemaUser');

router.post('/register', async (request, response) => {
    const { username, email, password } = request.body;
// Utilizing parameters and variables to facilitate the registration procedure
    
    
    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);
// Maintaining security by visually encrypting one's password
    
    // Creating user
    const user = new User({ username, email, password: encryptedPassword });
    try {
        const savedUser = await user.save();
        response.json({ userId: savedUser._id });
    } catch (err) {
        response.status(400).send(err);
    }
});
// Leveraging our User model to generate a new instance comprised of username, email and password

router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) return response.status(400).send('Email or password is wrong');
// Locating one's email to then deliver a suitable response

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return response.status(400).send('Invalid password');
// Employing a comparable method and function to check password
// Displaying a message according to the result
    
    const webToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    response.header('Access Granted', webToken).send({ webToken });
});
// Generating a JWT for the user by employing their unique ID and a secret key
// Establishing a response body for user access to secure API endpoints.

module.exports = router;
