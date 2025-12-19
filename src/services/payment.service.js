import axiosInstance from "../config/axiosInstance";
import { API_ROUTES } from "../config/config";

const getALlPayments = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_ROUTES.GET_ALL_PAYMENT}/${id}`);
        console.log("response all payments", response.data);
        return response.data;
    } catch (error) {
        console.log("getAllPayments() error", error);
        return error.response?.data;
    }
}

const createPayment = async (payload) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_NEW_PAYMENT, payload);
        console.log("reponse createPayment: ", response.data);
        return response.data;
    } catch (error) {
        console.log("createPayment() error", error);
        return error.response?.data;
    }
}

const updatePayment = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`${API_ROUTES.UPDATE_PAYMENT}/${id}`, payload);
        console.log("response updatePayment(): ", response.data);
        return response.data;
    } catch (error) {
        console.log("updatePayment() error", error);
        return error.response?.data;
    }
}

const deletePayment = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_ROUTES.DELETE_PAYMENT}/${id}`, payload);
        console.log("response deletePayment()", response.data);
        return response.data;
    } catch (error) {
        console.log("deletePayment() error: ", error);
        return error.response?.data;
    }   
}