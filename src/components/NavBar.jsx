import React from 'react'
import { routes } from '../config/Routes'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    const navRoutes = routes.find((route) => route.children);
    //console.log("navroutes: ", navRoutes)
  return (
    <div className='flex flex-col mx-5 justify-between h-full py-5'>
        <div className='flex flex-col gap-3'>
            {
                navRoutes?.children?.filter((child) => child.name).map((child) => {
                    return <NavLink key={child.path} to={child.path}
                    className={`p-2 py-3 bg-[#B5BAB5] w-full flex items-center rounded-md shadow-lg`}
                    > 
                    <div className='text-xl'>
                        {child.icon}
                    </div>
                    <div className='px-3 font-semibold tracking-wide'>
                        {child.name}
                    </div>
                    </NavLink>
                })
            }
        </div>
        <div className='bg-[#707370] p-2 rounded-lg shadow-lg'>
            Sign Out
        </div>
    </div>
  )
}

export default NavBar