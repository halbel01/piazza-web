
const express = require('express');
const sPost = require('../schemas/schemaPost');
const access = require('../middlewares/accessControl');
const router = express.Router();

router.post('/', access, async (request, response) => {
  const { title, category, mainBody, expire } = request.body;
// Employing an array to segregate our post into different meaningful sections
  const newPost = new sPost({
    title,
    category,
    mainBody,
    expire,
    owner: request.user._id
  });
// Utilizing the data provided to create a new post.

  try {
    const savedPost = await newPost.save();
    response.json(savedPost);
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post('/:id/like', access, async (request, response) => {
  try {
    const post = await sPost.findById(request.params.id);
    post.likes.push(request.user._id);
    await post.save();
    response.send('Liked');
  } catch (err) {
    response.status(400).send(err);
  }
});

// Commenting on post
router.post('/:id/comment', access, async (req, res) => {
  const comment = { body: req.body.body, date: new Date(), user: req.user._id };
  // Constructing a comment object including the user's ID, the comment body, and the current date.
  try {
    const post = await sPost.findById(req.params.id);
  // Considering the request parameters to locate the post by ID
    post.comments.push(comment);
    await post.save();
  // Saving the updated post with new comments.
    res.send('Comment added');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;



