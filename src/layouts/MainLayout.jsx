import React from 'react'
import { Outlet } from 'react-router-dom'
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
            <div className='p-3'>
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default MainLayout