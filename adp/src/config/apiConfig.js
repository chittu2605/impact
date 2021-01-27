import axios from "axios";

export const apiHandler = axios.create({ baseURL: "/adp" });
apiHandler.defaults.withCredentials = true;
//axios.defaults.headers.post["Content-Type"] = "application/json";
