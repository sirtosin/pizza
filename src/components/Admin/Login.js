import { useState } from "react";
import "./Login.css";
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

  return (
    <div className="login__container">
      <div className="login__wrapper">
        <h1>Admin Login</h1>
        <input
          placeholder="username"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button">Sign In</button>
        {error && <span className="error">Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
