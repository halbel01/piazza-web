const jwToken = require('jsonwebtoken');
// Managing JWT functions by importing the jsonwebtoken package 

module.exports = function (request, response, forward) {
  const webToken = request.header('Authorization');
  if (!webToken) return response.status(401).send('Access Denied');
// Attempting to extract a token from the 'Access Granted' request header

  try {
    const verified = jwToken.verify(webToken, process.env.JWT_SECRET);
    request.user = verified;
// Employing the secret key stored in environment variables to validate the token

    forward();
  } catch (err) {
    response.status(400).send('Invalid');
  }
};
// Forwarding command to the next middleware
// Responding with a bad request if verification is unsuccessful
