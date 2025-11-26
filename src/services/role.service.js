import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getAllRole = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_ROLES)
        console.log("Response all role", response.data)
        return response.data
    } catch (error) {
        console.log("Get All Role() Error", error)
        return error.response.data
    }
}

export const addNewRole = async (payload) => {
    console.log("payload:", payload)
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_ROLE, payload)
        return response.data
    } catch (error) {
        console.log("Add New Role() Error!", error);
        return error.response.data || { success: false, message: "Failed to add new role!" }
    }
}

export const updateRole = async (payload) => {
    console.log("Update role payload", payload)
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_ROLE}/${payload.id}`, payload)
        console.log("Reponse update role", response.data);
        return response.data
    } catch (error) {
        console.log("Update Role() Error!", error);
        return error.response.data || { success: false, message: "Failed to add new role!" }
    }
}