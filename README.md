<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->



import firebase from 'firebase/app';
import 'firebase/auth';

// Handle user registration
const handleSignup = (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const fname = e.target.fname.value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // After signup, save additional info to Firebase Realtime Database or Firestore
      // Example using Realtime Database:
      firebase.database().ref('users/' + user.uid).set({
        fname: fname,
        email: email,
      });

      // You can also use Firestore to store user data
    })
    .catch((error) => {
      console.error(error.message);
    });
};

<!-- .catch((error) => {
            if(error.code == 'auth/email-already-in-use'){
                seterror("email is already in use try another email");
            }else if (error.code === AuthErrorCodes.WEAK_PASSWORD){
                seterror("Password Must be 6 character");
            }else{
                seterror(error.message);
            }
        }) -->