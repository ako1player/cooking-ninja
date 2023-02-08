import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAE77gGtvv6zQDXIRl3Ly7zJYv9pw2SXOA",
    authDomain: "cooking-ninja-site-bc324.firebaseapp.com",
    projectId: "cooking-ninja-site-bc324",
    storageBucket: "cooking-ninja-site-bc324.appspot.com",
    messagingSenderId: "483815597095",
    appId: "1:483815597095:web:7df7ccf7b65a961d789a02"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()

  export { projectFirestore }