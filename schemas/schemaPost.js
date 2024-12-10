const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, 
  mainBody: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// Separating the post into different categories

  timeCreated: { type: Date, default: Date.now },
// Establishing a timestamp for when the post is created

  expire: Date,
  status: { type: String, default: 'Live' }, 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// Constructing an array to identify and group those who have liked the post

  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// Establishing an array to identify and group those who have disliked the post

  comments: [{
    body: String,
    date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
// Initializing an array of comments linked with the post
});

module.exports = mongoose.model('Post', postSchema);
