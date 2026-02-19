// Import Firebase
import firebase from 'firebase/app';
import 'firebase/database'; // For real-time database
import 'firebase/auth'; // For authentication (optional, for user login)

const firebaseConfig = {
  apiKey: "AIzaSyDWlOWLU6kN3Mvk8hoR3Bgkkij0z0sQ1x8",
  authDomain: "volleywolleyscoreapp.firebaseapp.com",
  databaseURL: "https://volleywolleyscoreapp-default-rtdb.firebaseio.com",
  projectId: "volleywolleyscoreapp",
  storageBucket: "volleywolleyscoreapp.firebasestorage.app",
  messagingSenderId: "910935210662",
  appId: "1:910935210662:web:d9eb1ed70b8e6f8f3bd267",
  measurementId: "G-H7WEWLQJXD"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // If already initialized
}

// Reference to the Realtime Database
const database = firebase.database();

// Export the Firebase database so we can use it in other files
export { database };