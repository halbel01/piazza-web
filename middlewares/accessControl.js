const jwToken = require('jsonwebtoken');
// Managing JWT functions by importing the jsonwebtoken package 

module.exports = function (request, response, forward) {
  const webToken = request.header('Authorization');
  if (!webToken) return response.status(401).send('Access Denied');
// Attempting to extract a token from the 'Access Granted' request header

  try {
    // Splitting the token to handle the format: 'Bearer <token>'
    const token = webToken.split(' ')[1];
    if (!token) {
      return response.status(401).send('Access Denied'); // If no token is found after "Bearer", deny access.
    }

    // Verifying the token using the secret key stored in environment variables.
    const verified = jwToken.verify(token, process.env.JWT_SECRET);
    request.user = verified;
// Employing the secret key stored in environment variables to validate the token

    forward();
  } catch (err) {
    console.error('Token Verification Error:', err); // Log the error for debugging purposes.
    response.status(400).send('Invalid Token'); // If verification fails, respond with an error.
  }
};
// Forwarding command to the next middleware
// Responding with a bad request if verification is unsuccessful
