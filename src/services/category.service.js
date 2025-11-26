import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getAllCategory = async() => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_CATEGORIES)
        console.log("Response all category", response.data)
        return response.data
    } catch (error) {
        console.log("Get All Category() Error", error)
        return error.response.data
    }
}

export const addNewCategory = async(payload) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_CATEGORY, payload)
        console.log("Response add new category: ", response.data)
        return response.data;
    } catch (error) {
        console.log("Add New Category() Error!", error)
        return error.response?.data || {success: false, message: "Failed to add new category!"}
    }
}

export const updateCategory = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_CATEGORY}/${id}`, payload)
        return response.data
    } catch (error) {
        console.log("Update Category() error!", error)
    }
}

export const deleteCategory = async(id) => {
    try {
        const response = await axiosInstance.delete(`${API_ROUTES.DELETE_CATEGORY}/${id}`)
        console.log("Delete Category response:", response.data)
        return response.data;
    } catch (error) {
        console.log("Delete Category() error!", error);
        return error.response?.data || {message: "Delete Category Failed!"}
    }
}