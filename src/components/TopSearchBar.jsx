import React, { useEffect, useState } from 'react'
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { routes } from '../config/Routes';
import { IoClose } from "react-icons/io5";
import { RiProfileLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useLocation, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const TopSearchBar = () => {
    
    const location = useLocation();
    //console.log("location: ", location);
    
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

    const { userData: isUser, logout, isLoading } = useUser();
    
    useEffect(() => {
        if (isUser) {
            //console.log("Username is", isUser.name);
        }
    }, [isUser]);

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

    useEffect(() => {
        const handleClickOutside = () => {
            setUserSettings(false);
            setIsDetail(false);
            setIsNotification(false);
        };

        if (userSettings || isDetail || isNotification) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [userSettings, isDetail, isNotification]);

    if (isLoading) {
        return (
            <div className='flex z-50 flex-col items-center justify-center sticky top-0'>
                <div className='flex w-full items-center justify-between sticky top-0 p-1 bg-[#383838]'>
                    <div className='p-3 text-amber-50 font-semibold tracking-wider text-2xl'>
                        Loading...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex z-50 flex-col items-center justify-center sticky top-0'>
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
                            value={search}
                            className='outline-none font-semibold tracking-wider placeholder:font-semibold placeholder:text-lg placeholder:tracking-wide' />
                            <FaSearch/>
                        </label>
                    }
                    <div className='relative'>
                        <FaBell 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleNoti();
                        }}
                        className='text-2xl text-amber-50 cursor-pointer hover:opacity-80'/>
                    </div>
                    <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleUserSettings();
                    }}
                    className='flex gap-3 relative items-center justify-center cursor-pointer hover:opacity-80'>
                        <img
                        src={isUser?.imageUrl || '/default-avatar.png'}
                        alt="User avatar"
                        className='text-2xl text-amber-50 active:opacity-60 w-[30px] h-[30px] rounded-full object-cover'
                        onError={(e) => {
                            e.target.src = '/default-avatar.png';
                        }}
                        />
                        <div
                        className='text-lg tracking-wide font-semibold select-none text-amber-50 active:opacity-60'>
                            {isUser?.name || 'Guest'}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`duration-300 w-2/17 ${userSettings? "opacity-100 translate-y-1" : "opacity-0 -translate-y-1 pointer-events-none"} flex flex-col absolute justify-center top-15 right-0 mr-3 gap-1 bg-[#383838] rounded-md shadow-lg z-50`}>
                <div 
                onClick={(e) => {
                    e.stopPropagation();
                    toggleUserDetail();
                    setUserSettings(false);
                }}
                className='flex items-center p-2 gap-1 border-b-white border-b-1 hover:bg-[#4a4a4a] cursor-pointer'>
                    <RiProfileLine className='text-xl text-amber-50' />
                    <div className='text-left text-amber-50 font-semibold tracking-wide'>
                        Profile Details
                    </div>
                </div>
                <Link 
                to="/settings"
                onClick={(e) => {
                    e.stopPropagation();
                    setUserSettings(false);
                }}
                className='flex items-center p-2 gap-1 border-b-white border-b-1 hover:bg-[#4a4a4a] cursor-pointer'>
                    <IoIosSettings className='text-xl text-amber-50' />
                    <div className='text-left text-amber-50 font-semibold tracking-wide'>Settings</div>
                </Link>
                <div 
                onClick={(e) => {
                    e.stopPropagation();
                    logout();
                    setUserSettings(false);
                }}
                className='flex items-center p-2 gap-1 border-b-white border-b-1 hover:bg-[#4a4a4a] cursor-pointer'>
                    <RiLogoutBoxFill className='text-xl text-amber-50' />
                    <div className='text-amber-50 text-left font-semibold tracking-wide'>Log Out</div>
                </div>
            </div>

            {
                isNotification &&
                <div 
                onClick={(e) => e.stopPropagation()}
                className='flex flex-col absolute top-16 w-2/15 z-40 right-0 mr-5 bg-red-500 p-3 rounded-md shadow-lg'>
                    <div className='text-white font-semibold mb-2'>Notifications</div>
                    <div className='text-white'>No new notifications</div>
                </div>
            }

            <div className={`flex flex-col duration-300 ${isDetail ? "opacity-100" : "opacity-0 pointer-events-none"} w-2/7 py-5 z-50 absolute top-30 rounded-lg bg-gradient-to-br from-[#383838] via-[#707070] to-[#383838] shadow-xl`}>
                <div className='text-center relative text-3xl py-3 font-semibold tracking-wider text-amber-50'>
                    Profile Details
                    <IoClose 
                    className='absolute right-0 cursor-pointer top-0 m-3 text-4xl active:opacity-60 hover:opacity-80' 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDetail(false);
                    }} 
                    />
                </div>
                <div className='flex items-center justify-center p-3'>
                    <img 
                    src={isUser?.imageUrl || '/default-avatar.png'} 
                    alt="User profile" 
                    className='w-[200px] h-[200px] rounded-[100%] object-cover'
                    onError={(e) => {
                        e.target.src = '/default-avatar.png';
                    }}
                    />
                </div>
                <div className='flex flex-col p-5 font-semibold text-lg px-10 gap-3 text-white/50'>
                    <div>
                        ID: {isUser?._id || 'N/A'}
                    </div>
                    <div>
                        Name: {isUser?.name || 'N/A'}
                    </div>
                    <div>
                        Email Address: {isUser?.email || "No Email Address"}
                    </div>
                    <div>
                        Role: {isUser?.role || 'N/A'}
                    </div>
                    <div>
                        Created At: {isUser?.createdAt?.slice(0, 10) || 'N/A'}
                    </div>
                    <div>
                        Updated At: {isUser?.updatedAt?.slice(0, 10) || 'N/A'}
                    </div>
                </div>
            </div>

            {
                (isNotification || isDetail) && (
                    <div 
                    className='fixed w-full h-screen inset-0 z-30 bg-black/20'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsNotification(false);
                        setIsDetail(false);
                    }}
                    />
                )
            }
        </div>
    )
}

export default TopSearchBar