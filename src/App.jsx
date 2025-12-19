import React, { useEffect, useMemo } from 'react'
import { routes } from './config/Routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import { ToastContainer} from 'react-toastify'
import { socket } from './socket';
import { getItemFromLocalStorage } from './helpers/helper'
import { STORAGE_KEY } from './config/config'

const AppContent = () => {

  const { userData } = useUser();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket connected!", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message);
    });
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
    }
  }, []);

  const router = useMemo(() => {
    const allowedUserRoutes = userData?.role?.allowedPaths || ["/login"]
    //console.log("Route:", allowedUserRoutes);
    
    const userRole = userData?.role;
    //console.log("User Role:", userRole)
    
    const storedTabs = getItemFromLocalStorage(STORAGE_KEY.CLICKED_TAB);

    const filteredRoutes = routes.map((route) => {
      if (route.children) {
        const allowedChildren = route.children.filter((child) => allowedUserRoutes?.includes(child.path))
         //console.log("Allowed Children Routes",allowedChildren)
        if(allowedChildren?.length === 0) return null
       
        return {
          ...route,
          children: allowedChildren
        }
      }
      return allowedUserRoutes?.includes(route.path) ? route : null
    }).filter(Boolean)

    filteredRoutes.push({
      path: "*",
      element: userData ? <Navigate to={storedTabs ? storedTabs: filteredRoutes[0].path}/> : <Navigate to="/login"/>
    })

    //console.log("allowed routes: ", filteredRoutes)
    return createBrowserRouter(filteredRoutes)
  }, [userData])

  return <RouterProvider router={router} />
}

const App = () => (
<UserProvider>
  <ToastContainer/>
  <AppContent/>
</UserProvider>
)

export default App
