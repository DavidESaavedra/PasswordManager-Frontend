import React, { useEffect, useState } from "react";
import styles from "./Body.module.css";
import Entries from "./Entries";
import NewEntries from "./NewEntries";
import { useSelector } from "react-redux";
import axiosInstance from "./axios/axiosInstance";

const Body = () => {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const sorted = (data) => {
    const sorted = data.sort((a, b) => {
      let first = a.title.toUpperCase();
      let second = b.title.toUpperCase();

      if (first < second) {
        return -1;
      } else if (first > second) {
        return 1;
      } else {
        return 0;
      }
    });

    return sorted;
  };

  const newEntry = (entry) => {
    setData(sorted([...data, entry]));
  };

  const deleteEntry = (entryKey) => {
    const temp = data.filter((a) => {
      return entryKey !== a.pKey;
    });

    setData(temp);
  };

  const editEntry = (entry) => {
    const temp = data.filter((a) => {
      return entry.pKey !== a.pKey;
    });

    setData(sorted([...temp, entry]));
  };

  useEffect(() => {
    axiosInstance
      .post(
        "/passwords/entries",
        {
          ID: auth.ID,
          accessToken: auth.accessToken,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        // have to have this couldn't fix it in backend
        if (response !== undefined) {
          setData(sorted([...response.data]));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [auth]);

  return (
    <div className={styles.body}>
      {!auth.accessToken && <h1 className={styles.please}>Please Log In</h1>}

      {auth.accessToken && (
        <>
          <div className={styles.container}>
            {data.map((item) => (
              <Entries
                key={item.pKey}
                {...item}
                eraseEntry={deleteEntry}
                editEntry={editEntry}
              />
            ))}
          </div>

          <div className={styles.container}>
            <NewEntries onSubmit={newEntry} />
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
