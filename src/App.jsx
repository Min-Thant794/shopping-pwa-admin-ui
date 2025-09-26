import React, { useMemo } from 'react'
import { routes } from './config/Routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import { ToastContainer} from 'react-toastify'

const AppContent = () => {

  const { userData } = useUser()

  const router = useMemo(() => {
    const allowedUserRoutes = userData?.allowedPath || ["/login"]
    //console.log("Route:", allowedUserRoutes);
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
      element: userData ? <Navigate to={filteredRoutes[1]?.children[0]?.path || "/dashboard"}/> : <Navigate to="/login"/>
    })

    console.log("allowed routes: ", filteredRoutes)
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