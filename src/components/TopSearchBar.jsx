import React, { useEffect, useState } from 'react'
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { getItemFromLocalStorage } from '../helpers/helper';
import { STORAGE_KEY } from '../config/config';
import { routes } from '../config/Routes';
import Sampleimage from '../assets/logo/sampleProfile.png'
import { IoClose } from "react-icons/io5";

    const TopSearchBar = () => {

        const [ isUser, setIsUser ] = useState(null);
        useEffect(() => {
            const userName = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
            setIsUser(userName);
            console.log("Username is", userName.name)
        }, [])

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

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='flex w-full items-center justify-between sticky top-0 p-1 bg-[#383838]'>
            <div className='p-3 text-amber-50 font-semibold tracking-wider text-2xl'>
                OVERVIEW
            </div>
            <div className='flex items-center px-5 gap-5'>
                <label htmlFor='search' className='flex items-center justify-center py-2 px-5 bg-[#e9eae8] rounded-full'>
                    <input 
                    onChange={(e) => setSearch(e.target.value)}
                    id='search' 
                    type="text" 
                    placeholder='Search' 
                    className='outline-none font-semibold tracking-wider placeholder:font-semibold placeholder:text-lg placeholder:tracking-wide' />
                    <FaSearch/>
                </label>
                <div className=''>
                    <FaBell 
                    onClick={toggleNoti}
                    className='text-2xl text-amber-50'/>
                </div>
                <div className='flex gap-3 cursor-pointer'>
                    <FaUser
                    onClick={toggleUserDetail}
                    className='text-2xl text-amber-50 active:opacity-60'/>
                    <div 
                    onClick={toggleUserDetail}
                    className='text-lg tracking-wide font-semibold select-none text-amber-50 active:opacity-60'>
                        {isUser?.name}
                    </div>
                </div>
            </div>
        </div>
        {
            isNotification &&
            <div className='flex flex-col absolute top-16 w-2/15 z-50 right-0 mr-5 bg-red-500 p-3'>
                notification will appear here!
            </div>
        }
        {
            isDetail
            &&
                <div className={`flex flex-col w-2/8 absolute top-35 rounded-lg bg-gradient-to-br from-[#383838] via-[#707070] to-[#383838]`}>
                    <div className='text-center relative text-3xl py-3 font-semibold tracking-wider text-amber-50'>
                        Profile Details
                        <IoClose className='absolute right-0 cursor-pointer top-0 m-3 text-4xl active:opacity-60' onClick={() => setIsDetail(!isDetail)} />
                    </div>
                    <div className='flex items-center justify-center p-3'>
                        <img src={Sampleimage} alt="" className='w-[200px] h-[200px] rounded-[100%]' />
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
                    </div>
                </div>
        }
        {
            isNotification && (
                <div className='fixed w-full h-screen inset-0 z-40 bg-black/20'
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