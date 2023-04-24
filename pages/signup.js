const Signup = () => {
  return (
    <div className="main">
      <form className="form">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
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
          <button type="button">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
