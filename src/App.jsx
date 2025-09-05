import React, { useEffect, useMemo, useState } from 'react'
import { getItemFromLocalStorage } from './helpers/helper'
import { STORAGE_KEY } from './config/config'
import { routes } from './config/Routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const App = () => {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const storedUserData = getItemFromLocalStorage(STORAGE_KEY.USER_DATA)
    setUserData(storedUserData)
  }, [])

  const router = useMemo(() => {
    const allowedUserRoutes = userData?.data.allowedPath || ["/login"]
    console.log("Route:", allowedUserRoutes);
    const filteredRoutes = routes.map((route) => {
      if (route.children) {
        const allowedChildren = route.children.filter((child) => allowedUserRoutes?.includes(child.path))
         console.log(allowedChildren)
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
      element: userData ? <Navigate to={filteredRoutes[1]?.children[0]?.path}/> : <Navigate to={routes.path}/>
    })

    console.log("allowed routes: ", filteredRoutes)
    return createBrowserRouter(filteredRoutes)
  }, [userData])

  return <RouterProvider router={router} />
}

export default App