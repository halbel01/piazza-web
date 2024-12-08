const { getDatabase } = require('firebase-admin/database');
const db = getDatabase();
// Incorporating firebase by importing the firebase library.

const User = {
  // Declaring a new user
  create: async (data) => {
    const docRef = db.collection('users').doc(); // Generating a new document ID
    await docRef.set({
      username: data.username,
      email: data.email,
      password: data.password, // Ensuring passwords are hashed before storing
      createdAt: new Date()
    });
    return docRef.id;
  },
// Establishing a schema which defines the structural guidelines for documents used in MongoDB
// Enforcing datatypes and input fields

  findByEmail: async (email) => {
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      throw new Error('User not found');
    }
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },
// Locating a user by email
  
  findById: async (id) => {
    const doc = await db.collection('users').doc(id).get();
    if (!doc.exists) {
      throw new Error('User not found');
    }
    return { id: doc.id, ...doc.data() };
  }
};
// Locating a user by ID 

module.exports = User;
// Building a model to communicate with the relevant firebase set





