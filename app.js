
// =====================FIREBASE============================

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKjmmvXkgpCwpgkexl39-_MRE7PAgFAwI",
    authDomain: "mumbaease.firebaseapp.com",
    databaseURL: "https://mumbaease-default-rtdb.firebaseio.com",
    projectId: "mumbaease",
    storageBucket: "mumbaease.appspot.com",
    messagingSenderId: "65575732411",
    appId: "1:65575732411:web:d007bbac3776c2dade959e",
    measurementId: "G-XZW2YMXY8B"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Handle form submission
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Log the captured email and password
    console.log('Email:', email);
    console.log('Password:', password);
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addEntryToDatabase(user);
      })
      .catch((error) => {
        console.error('Error signing in:', error.message);
      });
  });
  
  function addEntryToDatabase(user) {
    const userId = user.uid;
    const userRef = database.ref('users/' + userId);
    userRef.set({
      email: user.email,
      lastLogin: new Date().toISOString()
    })
    .then(() => {
      console.log('User data added to database');
    })
    .catch((error) => {
      console.error('Error adding data to database:', error.message);
    });
  }