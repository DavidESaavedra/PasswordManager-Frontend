import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import axios from "./axios/axios";
import { setCredentials, selectCurrentToken } from "./features/auth/authSlice";
import axiosInstance from "./axios/axiosInstance";
// import { jwt_decode } from "jwt-decode";

// axios interceptors for 403 response from server for new access token
const { dispatch } = store;
axiosInstance.interceptors.request.use(async (req) => {
  // if (!selectCurrentToken) {
  //   // refresh
  // }

  // const user = jwt_decode(selectCurrentToken)
  // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
  // if (!isExpired){
  //   return req
  // }

  await axios
    .get("/refresh", { withCredentials: true })
    .then((res) => {
      dispatch(
        setCredentials({ ID: res.data.ID, accessToken: res.data.accessToken })
      );
      req.data = {
        ...req.data,
        ID: res.data.ID,
        accessToken: res.data.accessToken,
      };
    })
    .catch((err) => {
      console.log(err);
    });

  return req;
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
