import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { register, login, changePassword } from "../redux/userSlice";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);

  const signupHandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:7000/user/signup", { username, password })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        throw new Error(error);
      });

    dispatch(register({ username, password }));

    navigate("/admin");
  };
  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:7000/user/signin", { username, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.data));
      })
      .catch((err) => console.log(err));
    dispatch(login({ username, password }));

    navigate("/admin");
  };
  const changePasswordHandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:7000/user/changepassword", {
        username,
        newpassword,
        token: JSON.parse(localStorage.getItem("token")),
      })
      .then((res) => {
        console.log(res.data);
        localStorage.getItem("token");
      })

      .catch((err) => console.log(err));
    dispatch(changePassword({ username, password }));

    navigate("/admin");
  };

  return (
    <>
      {user ? (
        <div className="login_auth">
          <h3>you are logged in as, {user.username}</h3>
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
              />
              <input
                placeholder="password"
                type="password"
                name="password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                style={{ display: "none" }}
                placeholder="password"
                type="password"
                name="newpassword"
                className="input"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="login__button" onClick={signupHandleSubmit}>
                Sign Up
              </button>
              <button className="login__button" onClick={loginHandleSubmit}>
                Login
              </button>
              <button
                className="login__button"
                onClick={changePasswordHandleSubmit}
              >
                change Password
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
