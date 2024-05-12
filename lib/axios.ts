import axios from "axios";

// Instantiate a new Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axiosInstance;
