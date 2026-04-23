import React from 'react'
import { routes } from '../config/Routes'
import { NavLink } from 'react-router-dom'
import RippleButton from './RippleButton';
import { useUser } from '../context/UserContext';

const NavBar = () => {
    const {logout} = useUser();
    const navRoutes = routes.find((route) => route.children);
    //console.log("navroutes: ", navRoutes)
  return (
    <div className='flex flex-col w-full px-3 justify-between h-full py-5 bg-[#383838]'>
        <div className='flex flex-col gap-3'>
            <div className='font-bold tracking-wider text-2xl mb-10 text-amber-50'>
                THREADED
            </div>
            {
                navRoutes?.children?.filter((child) => child.name).map((child) => {
                    if(navRoutes.path === "/settings") return

                    return <RippleButton key={child?.path}>
                        <NavLink key={child?.path} to={child?.path}
                        className={({ isActive }) => `w-full flex items-center rounded-md shadow-lg p-2 ${isActive ? 'bg-[#757474]' : 'bg-[#B5BAB5]'}`}
                        >
                        {/* <span className='h-full z-50 block left-0'></span> */}
                        <div className='text-xl flex'>
                            {child?.icon}
                        </div>
                        <div className='px-3 h-full font-semibold tracking-wide'>
                            {child?.name}
                        </div>
                        </NavLink>
                    </RippleButton>
                })
            }
        </div>
        <RippleButton
        onClick={logout}
        className='bg-[#707370] p-2 rounded-lg shadow-lg cursor-pointer font-bold tracking-wide'>
            Sign Out
        </RippleButton>
    </div>
  )
}

export default NavBar