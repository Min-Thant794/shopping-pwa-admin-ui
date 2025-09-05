import UserCreate from '../pages/UserCreate';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Order from '../pages/Order';
import Product from '../pages/Product';
import Unit from '../pages/Unit';
import Category from '../pages/Category';
import MainLayout from '../layouts/MainLayout';
import { Navigate } from 'react-router-dom';

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
                element: <Dashboard/>
            },
            {
                name: "User Create",
                path: "/user-create",
                element: <UserCreate/>
            },
            {
                name: "Order",
                path: "/order",
                element: <Order/>
            },
            {
                name: "Product",
                path: "/product",
                element: <Product/>
            },
            {
                name: "Unit",
                path: "/unit",
                element: <Unit/>
            },
            {
                name: "Category",
                path: "/category",
                element: <Category/>
            }
        ]
    }
]