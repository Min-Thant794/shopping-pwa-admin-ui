import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const createUser = async (payload) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_USER, payload)
        console.log("createUser() response", response.data);
        return response.data
    } catch (error) {
        console.log("createUser() Error!", error);
        return {
            success: false,
            message: error.response?.data?.message || "Server Error",
            error
        }
    }
}

export const getAllAdmin = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_ADMIN)
        console.log("getAllAdmin() response",  response.data)
        return response.data
    } catch (error) {
        console.log("GetAllAdmin() error", error)
        return {
            success: false,
            message: error.response?.data?.message || "Server Error",
            error
        }
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

export const updateUserRole = async (id, payload) => {
    try {
        console.log(payload)
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_USER_ROLE}/${id}`, payload)
        console.log("updateUserRole() response", response.data)
        return response.data
    } catch (error) {
        console.log("updateUserRole() error", error)
        return {
            success: false,
            message: error.response?.data?.message || "Sever Error",
            error
        }
    }
}