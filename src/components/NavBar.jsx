import React from 'react'
import { routes } from '../config/Routes'
import { NavLink } from 'react-router-dom'
import RippleButton from './RippleButton';

const NavBar = () => {
    const navRoutes = routes.find((route) => route.children);
    //console.log("navroutes: ", navRoutes)
  return (
    <div className='flex flex-col mx-5 justify-between h-full py-5'>
        <div className='flex flex-col gap-3'>
            {
                navRoutes?.children?.filter((child) => child.name).map((child) => {
                    return <RippleButton key={child.path}>
                        <NavLink key={child.path} to={child.path}
                        className={({ isActive }) => `w-full flex items-center rounded-md shadow-lg p-2 ${isActive ? 'bg-[#707370]' : 'bg-[#B5BAB5]'}`}
                        >
                        {/* <span className='h-full z-50 block left-0'></span> */}
                        <div className='text-xl flex'>
                            {child.icon}
                        </div>
                        <div className='px-3 h-full font-semibold tracking-wide'>
                            {child.name}
                        </div>
                        </NavLink>
                    </RippleButton>
                })
            }
        </div>
        <RippleButton className='bg-[#707370] p-2 rounded-lg shadow-lg cursor-pointer'>
            Sign Out
        </RippleButton>
    </div>
  )
}

export default NavBar