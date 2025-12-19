import { io } from "socket.io-client";
import { API_ROUTES } from "./config/config";
export const socket = io(`${API_ROUTES.LOCAL_BASE_URL}`, {
    transports: ["websocket"]
});