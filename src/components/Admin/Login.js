import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { register, login } from "../redux/userSlice";
import "./Login.css";
import { useRef, useState } from "react";

import { signup, mylogin, logout, useAuth } from "../firebase";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);

  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      dispatch(register({ username, password }));
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await mylogin(emailRef.current.value, passwordRef.current.value);
      dispatch(login({ username, password }));
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <>
      {user ? (
        <div className="login_auth">
          <h3 className="login__text">you are logged in as, {user.username}</h3>
          <Link to="/admin">
            <button>proceed to dashboard</button>
          </Link>
        </div>
      ) : (
        <>
          {error && <span className="error">something went wrong!!!</span>},
          <div className="login__container">
            <div className="login__wrapper">
              <h1>Admin Login</h1>
              <input
                placeholder="name"
                name="username"
                className="input"
                onChange={(e) => setUsername(e.target.value)}
                ref={emailRef}
              />
              <input
                placeholder="password"
                type="password"
                name="password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
              />

              <button className="login__button" onClick={handleSignup}>
                Sign Up
              </button>
              <button className="login__button" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
