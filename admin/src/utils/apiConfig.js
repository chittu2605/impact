import axios from "axios";

export const apiHandler = axios.create();
apiHandler.defaults.withCredentials = true;
apiHandler.interceptors.request.use(
  function (config) {
    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add("loading-indicator");

    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiHandler.interceptors.response.use(
  function (response) {
    // spinning hide
    // UPDATE: Add this code to hide global loading indicator

    document.body.classList.remove("loading-indicator");

    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      alert("Session timed out");
      window.location.replace(window.location.origin);
    }
    document.body.classList.remove("loading-indicator");

    return Promise.reject(error);
  }
);
