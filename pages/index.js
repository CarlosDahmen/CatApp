import Link from "next/link";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const emailHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const loginHandler = async () => {
    const auth = getAuth();

    try {
      if (email && password) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Navigate the user to the Home page
        router.push("/home");
      } else setErrorMessage("Enter Email and Password");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(
        "Error with credentials! check your username and password"
      );
    }
  };

  return (
    <main className="main">
      <h1>My App</h1>
      <div className="container">
        <form className="form">
          <label htmlFor="username">Username:</label>
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
            <button type="button" onClick={loginHandler}>
              Log In
            </button>
            <button type="button">
              <Link href="/signup">Sign Up</Link>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
