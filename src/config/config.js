export const STORAGE_KEY = {
    USER_DATA : "user-data",
    TOKEN: "x-access-token",
    CLICKED_TAB: "clickedTab"
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:8080/";

export const API_ROUTES = {
    //DEPLOY_BASE_URL: "https://shopping-backend-amy1.onrender.com/api/v1",
    LOCAL_BASE_URL: API_BASE_URL,
    LOCAL_SERVER_URL: SERVER_URL,
    
    //user auth
    USER_LOGIN: "/user/login",
    UPDATE_USER: "/user",
    GET_ALL_ADMIN: "/user/admin",
    POST_NEW_USER: "/user",
    UPDATE_USER_ROLE: "/user/role",

    //unit
    GET_ALL_UNIT: "/unit",
    POST_NEW_UNIT: "/unit",
    UPDATE_UNIT: "/unit",
    DELETE_UNIT: "/unit",
    
    //categories
    GET_ALL_CATEGORIES: "/category",
    POST_NEW_CATEGORY: "/category",
    UPDATE_CATEGORY: "/category/id",
    DELETE_CATEGORY: "/category/id",

    //role
    GET_ALL_ROLES: "/role",
    POST_NEW_ROLE: "/role",
    UPDATE_ROLE: "/role",

    //product
    GET_ALL_PRODUCT: "/product/products-by-id",
    POST_NEW_PRODUCT: "/product",
    UPDATE_PRODUCT: "/product",
    DELETE_PRODUCT: "/product",

    //payment
    GET_ALL_PAYMENT: "/payment/payments-by-id",
    POST_NEW_PAYMENT: "/payment",
    UPDATE_PAYMENT: "/payment",
    DELETE_PAYMENT: "/payment",

    //order
    GET_ALL_ORDER: "/order/orders-by-id",
}
