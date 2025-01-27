// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMJNqsJuLc7uOYlorBSvD8co3R7rkW6Yk",
  authDomain: "casiangelesydemonios.firebaseapp.com",
  projectId: "casiangelesydemonios",
  storageBucket: "casiangelesydemonios.firebasestorage.app",
  messagingSenderId: "1021380147178",
  appId: "1:1021380147178:web:50a78af9de6945723ae493",
  measurementId: "G-8TV7WNHDW4"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
