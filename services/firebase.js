import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, update, push } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeMtztReue3SAqs-ohujmcXwIruj0Xgog",
  authDomain: "authproject-f59d6.firebaseapp.com",
  projectId: "authproject-f59d6",
  storageBucket: "authproject-f59d6.appspot.com",
  messagingSenderId: "750339401646",
  appId: "1:750339401646:web:ef1aa441fbfc7d05518a3f",
  databaseUrl: "https://authproject-f59d6-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
};

export const getUserData = (userId) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().favorite_ids;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addToUserFavorites = (userId, favorites) => {
  const db = getDatabase();
  const updates = {};
  updates[`users/${userId}/favorite_ids`] = favorites;
  // push(child(ref(db), `users/${userId}/favorite_ids`));
  return update(ref(db), updates);
};

//push(child(ref(db), 'posts')

// export const removeFromUserFavorites = (userId) => {
//   const db = getDatabase();

// }
