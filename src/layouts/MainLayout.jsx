import React from 'react'
import { Outlet } from 'react-router-dom'
import logoImg from '../assets/logo/logo.png'
import NavBar from '../components/NavBar'

const MainLayout = () => {
  return (
    <div className='flex'>
        <div className='flex flex-col w-2/14 py-5 h-screen bg-[#e9eae8] font-semibold text-center gap-3'>
            <img src={logoImg} alt="" />
            Modern Admin Dashboard
            <NavBar/>
        </div>
        <div>right
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout