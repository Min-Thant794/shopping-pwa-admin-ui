import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

export const getProduct = async (payload) => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ALL_PRODUCT, payload);
        console.log("response get product: ", response.data);
        return response.data;
    } catch (error) {
        console.log("getProduct() error", error);
        return error.response?.data
    }
}

export const createProduct = async (payload) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_PRODUCT, payload);
        console.log("reponse create product: ", response.data);
        return response.data;
    } catch (error) {
        console.log("createProduct() error", error);
        return error.response?.data;
    }
}

export const updateProduct = async (payload, id) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_PRODUCT}/${id}`, payload);
        console.log("response update product: ", response.data);
        return response.data;
    } catch (error) {
        console.log("updateProduct() error", error);
        return error.response?.data;
    }
}

export const deleteProduct = async(id) => {
    try {
        const response = await axiosInstance.delete(`${API_ROUTES.DELETE_PRODUCT}/${id}`);
        console.log("response delete product: ", response.data);
    } catch (error) {
        console.log("deleteProduct() error", error);
        return error.response?.data;
    }
}