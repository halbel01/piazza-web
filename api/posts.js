const express = require('express');
const router = express.Router();

module.exports = (database) => {
  const posts = database.collection('posts');

  router.post('/', async (request, response) => {
    const { title, category, mainBody, expire, owner } = request.body;
// Employing an array to segregate our post into different meaningful sections
    try {
      const newPost = {
        title,
        category,
        mainBody,
        expire: new Date(expire),
        owner,
        likes: [],
        comments: [],
        createdAt: new Date(),
      };
// Utilizing the data provided to create a new post.
            const docRef = await posts.add(newPost);
      res.status(201).json({ id: docRef.id, ...newPost });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });



router.post('/:id/like', access, async (request, response) => {
    try {
      const postRef = postsCollection.doc(req.params.id);
      const post = await postRef.get();

      if (!post.exists) {
        return res.status(404).send('Post not found');
      }
            const postData = post.data();
      postData.likes.push(req.body.userId);
      await postRef.update({ likes: postData.likes });

      res.send('Liked');
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

// Commenting on post
router.post('/:id/comment', access, async (req, res) => {
  const comment = { body: req.body.body, date: new Date(), user: req.user._id };
  // Constructing a comment object including the user's ID, the comment body, and the current date.
  try {
    const postRef = posts.doc(req.params.id);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).send('Post not found');
      }
  // Considering the request parameters to locate the post by ID
      const postData = post.data();
      postData.comments.push(comment);
      await postRef.update({ comments: postData.comments });
  // Saving the updated post with new comments.
 res.send('Comment added');
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  return router;
};



