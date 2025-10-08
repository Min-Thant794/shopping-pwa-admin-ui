import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getAllUnit = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_UNIT)
        console.log("Response all unit", response.data)
        return response.data
    } catch (error) {
        console.log("Get All Unit() error", error)
        return error.response.data
    }
}

export const addNewUnit = async (payload) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_UNIT, payload);
        console.log("Response add new unit: ", response.data);
        return response.data;
    } catch (error) {
        console.log("Add New Unit() error!", error);
        return error.response?.data || { success: false, message: "Failed to add unit" };
    }
};

export const updateUnit = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_UNIT}/${id}`, payload)
        return response.data
    } catch (error) {
        console.log("Update Unit() error!", error)
    }
}

export const deleteUnit = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_ROUTES.DELETE_UNIT}/${id}`);
    console.log("Response delete unit:", response.data);
    return response.data;
  } catch (error) {
    console.log("Delete Unit() error!", error);
    return error.response?.data || { message: "Delete unit failed" };
  }
};