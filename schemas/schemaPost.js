const { getDatabase } = require('firebase-admin/database');
const db = getDatabase();

const Post = {
  // Create a new post
  create: async (data) => {
    const docRef = db.collection('posts').doc(); // Generating a new document ID
    await docRef.set({
      title: data.title,
      category: data.category,
      mainBody: data.mainBody,
      expire: data.expire || null,
      owner: data.owner,
      likes: [],
      dislikes:[],
      comments: [],
      timeCreated: new Date()
    });
    return docRef.id; 
  },
// Separating the post into different categories
// Establishing a timestamp for when the post is created

  findById: async (id) => {
    const doc = await db.collection('posts').doc(id).get();
    if (!doc.exists) {
      throw new Error('Post not found');
    }
    return { id: doc.id, ...doc.data() };
  },

  addLike: async (id, userId) => {
    const postRef = db.collection('posts').doc(id);
    // Generating a new document ID
    const post = await postRef.get();
    if (!post.exists) {
      throw new Error('Post not found');
    }
    const data = post.data();
    if (data.likes.includes(userId)) {
      throw new Error('User has already liked this post');
    }
    // Checking if the user has already liked or disliked the post
    // Avoiding duplicate instances
    await postRef.update({
      likes: [...data.likes, userId]
    });
  },
// Constructing an array to identify and group those who have liked the post

  addDislike: async (id, userId) => {
    const postRef = db.collection('posts').doc(id);
    // Generating a new document ID
    const post = await postRef.get();
    if (!post.exists) {
      throw new Error('Post not found');
    }
    const data = post.data();
    if (data.dislikes.includes(userId)) {
      throw new Error('User has already disliked this post');
    }
    // Checking if the user has already liked or disliked the post
    // Avoiding duplicate instances
    await postRef.update({
      dislikes: [...data.dislikes, userId],
      likes: updatedLikes
    });
// Handling and updating the dislikes functionality of our system
  },
// Establishing an array to identify and group those who have disliked the post

  addComment: async (id, comment) => {
    const postRef = db.collection('posts').doc(id);
    // Generating a new document ID
    const post = await postRef.get();
    if (!post.exists) {
      throw new Error('Post not found');
    }
    await postRef.update({
      comments: [...post.data().comments, comment]
    });
  }
};
// Initializing an array of comments linked with the post

module.exports = Post;
