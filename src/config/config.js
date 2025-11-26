export const STORAGE_KEY = {
    USER_DATA : "user-data",
    TOKEN: "x-access-token"
}

export const API_ROUTES = {
    //DEPLOY_BASE_URL: "https://shopping-backend-amy1.onrender.com/api/v1",
    LOCAL_BASE_URL: "http://localhost:8080/api/v1",
    
    //user auth
    USER_LOGIN: "/user/login",
    UPDATE_USER: "/user",
    GET_ALL_ADMIN: "/user/admin",

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
    UPDATE_ROLE: "/role"
}