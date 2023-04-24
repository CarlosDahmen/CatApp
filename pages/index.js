import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="main">
      <h1>My App</h1>
      <div className="container">
        <form className="form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />

          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="Enter password"></input>

          <div className="buttons-container">
            <button type="button">Log In</button>
            <button type="button">
              <Link href="/signup">Sign Up</Link>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
