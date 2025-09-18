import React from 'react'
import { Outlet } from 'react-router-dom'
import logoImg from '../assets/logo/logo.png'
import NavBar from '../components/NavBar'
import TopSearchBar from '../components/TopSearchBar'

const MainLayout = () => {
  return (
    <div className='flex scroll-smooth bg-[#707370]'>
        <div className='flex sticky top-0 w-2/14 h-screen text-center'>
            <NavBar/>
        </div>
        <div className='flex flex-col w-full'>
            <TopSearchBar/>
            <Outlet/>
            {/* <div className='w-full h-screen sticky top-0 bg-red-500'>one</div>
            <div className='w-full h-screen sticky top-0 bg-blue-500'>two</div>
            <div className='w-full h-screen sticky top-0 bg-black'>three</div> */}
        </div>
    </div>
  )
}

export default MainLayout