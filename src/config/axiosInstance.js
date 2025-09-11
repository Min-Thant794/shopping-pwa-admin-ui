import axios from "axios";
import { API_ROUTES, STORAGE_KEY } from "./config";
import { getItemFromLocalStorage } from "../helpers/helper";

const axiosInstance = axios.create({
    baseURL: API_ROUTES.DEPLOY_BASE_URL,
    timeout: 3000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getItemFromLocalStorage(STORAGE_KEY.TOKEN);
        if(token){
            config.headers[STORAGE_KEY.TOKEN] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && [401, 403].includes(error.response.status)){
            if(window.location.pathname !== "/login"){
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance