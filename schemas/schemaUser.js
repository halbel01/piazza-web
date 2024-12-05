const mongoose = require('mongoose');
// Incorporating MongoDB by importing the Mongoose library.

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Establishing a schema which defines the structural guidelines for documents used in MongoDB
// Enforcing datatypes and input fields

module.exports = mongoose.model('User', userSchema);
// Building a model to communicate with the relevant MongoDB set





