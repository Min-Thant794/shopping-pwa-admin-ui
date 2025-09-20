import React, { useEffect, useState } from 'react'
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { getItemFromLocalStorage } from '../helpers/helper';
import { STORAGE_KEY } from '../config/config';
import { routes } from '../config/Routes';
import Sampleimage from '../assets/logo/sampleProfile.png'
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useLocation, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import RippleButton from './RippleButton';

    const TopSearchBar = () => {

        const location = useLocation();
        console.log("location: ", location)
        const findRouteName = (path) => {
            for (const route of routes) {
                if(route.path === path) return route.name;
                if(route.children){
                    const child = route.children.find(r => r.path === path);
                    if(child) return child.name
                }
            }
            return "Dashboard";
        };
        const currentTitle = findRouteName(location.pathname);

        const [ isUser, setIsUser ] = useState(null);
        useEffect(() => {
            const userName = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
            setIsUser(userName);
            console.log("Username is", userName.name)
        }, [])

        const [userSettings, setUserSettings] = useState(false);
        const toggleUserSettings = () => {
            setUserSettings(!userSettings);
        }

        const [isDetail, setIsDetail] = useState(false);
        const toggleUserDetail = () => {
            setIsDetail(!isDetail)
        }

        const [isNotification, setIsNotification] = useState(false);
        const toggleNoti = () => {
            setIsNotification(!isNotification)
        }

        const [search, setSearch] = useState('');
        // useEffect(() => {
        //     const searchItem = Items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        //     setSearch(searchItem)
        // }, [search])
        console.log("Search: ", search)

        const { logout } = useUser()

  return (
    <div className='flex flex-col items-center justify-center sticky top-0'>
        <div className='flex w-full items-center justify-between sticky top-0 p-1 bg-[#383838]'>
            <div className='p-3 text-amber-50 font-semibold tracking-wider text-2xl'>
                {currentTitle}
            </div>
            <div className='flex items-center px-5 gap-5'>
                {
                    location.pathname === "/product" &&
                        <label htmlFor='search' className='flex items-center justify-center py-2 px-5 bg-[#e9eae8] rounded-full'>
                        <input 
                        onChange={(e) => setSearch(e.target.value)}
                        id='search' 
                        type="text"
                        placeholder='Search' 
                        className='outline-none font-semibold tracking-wider placeholder:font-semibold placeholder:text-lg placeholder:tracking-wide' />
                        <FaSearch/>
                    </label>
                }
                <div className=''>
                    <FaBell 
                    onClick={toggleNoti}
                    className='text-2xl text-amber-50'/>
                </div>
                <div 
                onClick={toggleUserSettings}
                className='flex gap-3 relative items-center justify-center cursor-pointer'>
                    <img
                    onClick={toggleUserSettings}
                    src={isUser?.imageUrl}
                    className='text-2xl text-amber-50 active:opacity-60 w-[30px] h-[30px] rounded-full'/>
                    <div
                    onClick={toggleUserSettings}
                    className='text-lg tracking-wide font-semibold select-none text-amber-50 active:opacity-60'>
                        {isUser?.name}
                    </div>
                </div>
            </div>
        </div>
        <div className={`duration-300 w-2/17 ${userSettings? "opacity-100 translate-y-1" : "opacity-0 -translate-y-1 pointer-events-none"} flex flex-col absolute justify-center top-15 right-0 mr-3 gap-1 bg-[#383838]`}>
            <div className='flex items-center p-2 gap-1 border-b-white border-b-1'>
                <RiProfileLine className='text-xl text-amber-50' />
                <div
                onClick={() => {toggleUserDetail();
                    setUserSettings(false)}}
                className='text-left cursor-pointer text-amber-50 font-semibold tracking-wide'>Profile Details
                </div>
            </div>
            <Link 
            to="/settings"
            onClick={() => {
                setUserSettings(false)
            }}
            className='flex items-center p-2 gap-1 border-b-white border-b-1'>
                <IoIosSettings className='text-xl text-amber-50' />
                <div className='cursor-pointer text-left text-amber-50 font-semibold tracking-wide'>Settings</div>
            </Link>
            <div 
            onClick={logout}
            className='flex items-center p-2 gap-1 border-b-white border-b-1'>
                <RiLogoutBoxFill className='text-xl text-amber-50' />
                <div className='text-amber-50 text-left cursor-pointer font-semibold tracking-wide'>Log Out</div>
            </div>
        </div>
        {
            isNotification &&
            <div className='flex flex-col absolute top-16 w-2/15 z-40 right-0 mr-5 bg-red-500 p-3'>
                notification will appear here!
            </div>
        }
        <div className={`flex flex-col duration-300 ${isDetail ? "opacity-100" : "opacity-0 pointer-events-none"} w-2/7 py-5 z-43 absolute top-30 rounded-lg bg-gradient-to-br from-[#383838] via-[#707070] to-[#383838]`}>
            <div className='text-center relative text-3xl py-3 font-semibold tracking-wider text-amber-50'>
                Profile Details
                <IoClose className='absolute right-0 cursor-pointer top-0 m-3 text-4xl active:opacity-60' onClick={() => setIsDetail(!isDetail)} />
            </div>
            <div className='flex items-center justify-center p-3'>
                <img src={isUser?.imageUrl} alt="" className='w-[200px] h-[200px] rounded-[100%]' />
            </div>
            <div className='flex flex-col p-5 font-semibold text-lg px-10 gap-3 text-white/50'>
                <div>
                    ID: {isUser?._id}
                </div>
                <div>
                    Name: {isUser?.name}
                </div>
                <div>
                    Email Address: {isUser?.email || "No Email Address"}
                </div>
                <div>
                    Role: {isUser?.role}
                </div>
                <div>
                    Created At: {isUser?.createdAt?.slice(0, 10)}
                </div>
                <div>
                    UPdated At: {isUser?.updatedAt?.slice(0, 10)}
                </div>
            </div>
        </div>
        {
            isNotification && (
                <div className='fixed w-full h-screen inset-0 z-30 bg-black/20'
                onClick={() => {
                    toggleNoti(true)
                }}
                />
            )
        }
    </div>
  )
}

export default TopSearchBar