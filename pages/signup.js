import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const usernameHandler = (evt) => {
    setUsername(evt.target.value);
  };

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const signupHandler = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      console.log(auth.currentUser);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="main">
      <form className="form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={usernameHandler}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={emailHandler}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={passwordHandler}
        ></input>

        <label
          visibility={errorMessage === "" ? "hidden" : "visible"}
          id="errorMessage"
        >
          {errorMessage}
        </label>

        <div className="buttons-container">
          <button type="button" onClick={signupHandler}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
