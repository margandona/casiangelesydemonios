const admin = require('firebase-admin');
const serviceAccount = require('./radio.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://casiangelesydemonios.firebaseio.com' // Updated database URL
});

const db = admin.firestore();

console.log('Firestore initialized'); // Add logging

module.exports = { admin, db };
