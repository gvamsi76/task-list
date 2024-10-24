import axios from "axios";

// Create the axios instance
const axiosInstance = axios.create({
    baseURL: `https://api.aroundme.co.in/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export const getToken = () => {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
      console.log(token, "token");
      return token;
    }
    return null;
  };
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;