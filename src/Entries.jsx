import React, { useState } from "react";
import styles from "./Entries.module.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axiosInstance from "./axios/axiosInstance";

const Entries = (props) => {
  const auth = useSelector((state) => state.auth);
  const { pKey, title, username, password } = props;
  const [popupDelete, setPopupDelete] = useState(false);
  const [edit, setEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(title);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);

  const model = (num) => {
    if (num === 0) {
      if (edit === true) {
        setEdit(false);
      } else {
        setEdit(true);
        setPopupDelete(false);
      }
    } else if (num === 1) {
      if (popupDelete === true) {
        setPopupDelete(false);
      } else {
        setPopupDelete(true);
        setEdit(false);
      }
    }
  };

  const editEntry = (e) => {
    e.preventDefault();

    axiosInstance
      .put("/passwords/edit", {
        ID: auth.ID,
        pKey: pKey,
        title: newTitle,
        username: newUsername,
        password: newPassword,
        accessToken: auth.accessToken,
      })
      .then((res) => {
        console.log(res);

        props.editEntry({
          pKey,
          title: newTitle,
          username: newUsername,
          password: newPassword,
        });

        toast("Credential Edited", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
        setEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEntry = () => {
    axiosInstance
      .delete(`/passwords/delete/${pKey}`, {
        data: {
          ID: auth.ID,
          pKey,
          accessToken: auth.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        props.eraseEntry(pKey);
        toast("Credential Deleted", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.border}>
      <div className={styles.box}>
        <div className={styles.box_left}>
          <p>{title}</p>
        </div>

        <div className={styles.box_right}>
          <a
            className={styles.tools}
            title="Edit Credentials"
            onClick={() => model(0)}
          >
            <img src="edit.png" alt="" />
          </a>
          <a
            className={styles.tools}
            title="Copy User"
            onClick={() => {
              navigator.clipboard.writeText(username);

              toast("User Copied", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
              });
            }}
          >
            <img src="user.png" alt="" />
          </a>
          <a
            className={styles.tools}
            title="Copy Password"
            onClick={() => {
              navigator.clipboard.writeText(password);

              toast("Password Copied", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
              });
            }}
          >
            <img src="password.png" alt="" />
          </a>
          <a
            className={styles.tools}
            title="Delete Credentials"
            onClick={() => model(1)}
          >
            <img src="delete.png" alt="" />
          </a>
        </div>
      </div>

      {edit && (
        <form className={styles.edit} onSubmit={editEntry}>
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
                defaultValue={title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </p>
            <p className={styles.edit_p}>
              <label htmlFor="user" className={styles.edit_label}>
                User
              </label>
              <input
                type="text"
                name="user"
                id="user"
                className={styles.edit_input}
                defaultValue={username}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </p>
            <p className={styles.edit_p}>
              <label htmlFor="password" className={styles.edit_label}>
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className={styles.edit_input}
                defaultValue={password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </p>
          </fieldset>

          <div className={styles.edit_buttons}>
            <button type="submit" className={styles.edit_button}>
              Submit
            </button>
            <button
              className={styles.edit_button}
              onClick={() => setEdit(!edit)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {popupDelete && (
        <div className={styles.delete}>
          <p>Delete Credentials?</p>
          <a
            onClick={() => {
              deleteEntry();

              setPopupDelete(!popupDelete);
            }}
          >
            Yes
          </a>
          <a onClick={() => setPopupDelete(!popupDelete)}>No</a>
        </div>
      )}
    </div>
  );
};

export default Entries;
