import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getAllAdmin = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_ADMIN)
        console.log("getAllAdmin() response",  response.data)
        return response.data
    } catch (error) {
        console.log("GetAllAdmin() error", error)
    }
}

export const updateUserData = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_USER}/${id}`, payload)
        console.log("updateUserData() ", response);
        return response.data
    } catch (error) {
        console.log("Error occurred during user data update process: ", error);

        return {
            success: false,
            message: error.response?.data?.message || "Server Error",
            error: error
        }
    }
}