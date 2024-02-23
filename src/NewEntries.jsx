import React, { useState } from "react";
import styles from "./NewEntries.module.css";
import { useSelector } from "react-redux";
import axiosInstance from "./axios/axiosInstance";

const NewEntries = (props) => {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);

  const newEntry = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/api/passwords/add", {
        title,
        username,
        password,
        ID: auth.ID,
        accessToken: auth.accessToken,
      })
      .then(function (response) {
        props.onSubmit({ title, username, password });
      })
      .catch(function (error) {
        console.log(error);
      });

    setTitle("");
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2 className={styles.entry_h2}>Add a New Entry</h2>
      <form className={styles.edit} onSubmit={newEntry}>
        <fieldset className={styles.edit_fieldset}>
          <p className={styles.edit_p}>
            <label htmlFor="title" className={styles.edit_label}>
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className={styles.edit_input}
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </p>
          <p className={styles.edit_p}>
            <label htmlFor="username" className={styles.edit_label}>
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className={styles.edit_input}
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </p>
          <p className={styles.edit_p}>
            <label htmlFor="password" className={styles.edit_label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={styles.edit_input}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </p>
        </fieldset>

        <div className={styles.edit_buttons}>
          <button type="submit" className={styles.edit_button}>
            Submit
          </button>
          <button
            type="reset"
            className={styles.edit_button}
            onClick={() => {
              setTitle("");
              setUsername("");
              setPassword("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
};

export default NewEntries;
