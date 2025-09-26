import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const updateUserData = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_USER}/${id}`, payload)
        console.log("updateUserData() ", response);
        return response.data
    } catch (error) {
        console.log("Error occurred during user data update process: ", error);
    }
}