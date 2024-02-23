import React, { useState } from "react";
import styles from "./Nav.module.css";
import axios from "./axios/axios";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";

localStorage.getItem("data-theme");
document.documentElement.setAttribute("data-theme", "dark");

let data = {
  email: "",
  password: "",
};

const Nav = () => {
  const [displayLog, setDisplayLog] = useState(false);
  const [displayReg, setDisplayReg] = useState(false);
  const [logUser, setLogUser] = useState(data);
  const [regUser, setRegUser] = useState(data);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginChange = (e) => {
    const { name, value } = e.target;
    setLogUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerChange = (e) => {
    const { name, value } = e.target;
    setRegUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const modalSwitch = (num) => {
    if (num === 0) {
      if (displayLog === true) {
        setDisplayLog(false);
      } else {
        setDisplayLog(true);
        setDisplayReg(false);
      }
    } else if (num === 1) {
      if (displayReg === true) {
        setDisplayReg(false);
      } else {
        setDisplayLog(false);
        setDisplayReg(true);
      }
    }
  };

  const Login = (e) => {
    e.preventDefault();

    axios
      .post("/login", {
        email: logUser.email.trim(),
        pwd: logUser.password.trim(),
      })
      .then(function (response) {
        dispatch(setCredentials(response.data));
        setDisplayLog(false);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const Register = (e) => {
    e.preventDefault();

    axios
      .post("/register", {
        email: regUser.email,
        pwd: regUser.password,
      })
      .then(function (response) {
        setDisplayReg(false);

        axios
          .post("/login", {
            email: regUser.email.trim(),
            pwd: regUser.password.trim(),
          })
          .then(function (response) {
            dispatch(setCredentials(response.data));
          })
          .catch(function (error) {
            console.log(error.response);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    axios
      .get("/logout", { withCredentials: true })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className={styles.header}>
      <a className={styles.leftNav}>Password Manager</a>
      <div className={styles.rightNav}>
        {auth.accessToken && <a onClick={logout}>Logout</a>}
        {!auth.accessToken && (
          <>
            <a onClick={() => modalSwitch(0)}>Login</a>
            <a onClick={() => modalSwitch(1)}>Register</a>
          </>
        )}
        {displayLog && (
          <form className={styles.popup} onSubmit={Login}>
            <fieldset className={styles.popup_fieldset}>
              <p className={styles.popup_p}>
                <label htmlFor="email" className={styles.popup_label}>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={logUser.email}
                  onChange={loginChange}
                  className={styles.popup_input}
                  required
                />
              </p>
              <p className={styles.popup_p}>
                <label htmlFor="password" className={styles.popup_label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={logUser.password}
                  onChange={loginChange}
                  className={styles.popup_input}
                  required
                />
              </p>
            </fieldset>
            <button className={styles.popup_button} type="submit">
              Login
            </button>
          </form>
        )}
        {displayReg && (
          <form className={styles.popup} onSubmit={Register}>
            <fieldset className={styles.popup_fieldset}>
              <p className={styles.popup_p}>
                <label htmlFor="email" className={styles.popup_label}>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={regUser.email}
                  onChange={registerChange}
                  className={styles.popup_input}
                  required
                />
              </p>
              <p className={styles.popup_p}>
                <label htmlFor="password" className={styles.popup_label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={regUser.password}
                  onChange={registerChange}
                  className={styles.popup_input}
                  required
                />
              </p>
            </fieldset>
            <button className={styles.popup_button} type="submit">
              Register
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Nav;
