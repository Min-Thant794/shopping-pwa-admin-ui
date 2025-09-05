import UserCreate from '../pages/UserCreate';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Order from '../pages/Order';
import Product from '../pages/Product';
import Unit from '../pages/Unit';
import Category from '../pages/Category';
import MainLayout from '../layouts/MainLayout';
import { Navigate } from 'react-router-dom';
import { FaHome, FaUserEdit } from "react-icons/fa";
import { BiSolidCategory, BiSolidPurchaseTag } from "react-icons/bi";
import { BiDetail } from "react-icons/bi";
import { SiHomeassistantcommunitystore } from "react-icons/si";

export const routes = [
    {
        name: "Login",
        path: "/login",
        element: <Login/>
    },
    {
        name: "Main",
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard"/>
            },
            {
                name: "Dashboard",
                path: "/dashboard",
                element: <Dashboard/>,
                icon: <FaHome />
            },
            {
                name: "User Create",
                path: "/user-create",
                element: <UserCreate/>,
                icon: <FaUserEdit/>
            },
            {
                name: "Order",
                path: "/order",
                element: <Order/>,
                icon: <BiSolidPurchaseTag />
            },
            {
                name: "Product",
                path: "/product",
                element: <Product/>,
                icon: <SiHomeassistantcommunitystore />
            },
            {
                name: "Unit",
                path: "/unit",
                element: <Unit/>,
                icon: <BiDetail />
            },
            {
                name: "Category",
                path: "/category",
                element: <Category/>,
                icon: <BiSolidCategory />
            }
        ]
    }
]