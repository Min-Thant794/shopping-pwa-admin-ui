import React, { useEffect } from 'react'
import { useState } from 'react'
import { getItemFromLocalStorage } from '../helpers/helper';
import { STORAGE_KEY } from '../config/config';
import RippleButton from '../components/RippleButton';

const Settings = () => {

    const [isUser, setIsUser] = useState(null);
    useEffect(()=>{
        const userInformation = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
        setIsUser(userInformation);
    },[])

    const allowedPaths = isUser?.allowedPath?.map(path => path.substring(1)).join(", ");

  return (
    <div className='flex justify-center bg-[#808080]'>
            <form
            className='flex flex-col justify-center text-amber-50 font-semibold items-center px-10 py-5 rounded-lg w-5/15 gap-3 bg-[#383838] mb-5 mt-10'
            action="">
                    <h1 className='text-3xl font-semibold'>
                        User Information
                    </h1>
                    <div className='mt-5'>
                        <img src={isUser?.imageUrl} className='rounded-full w-[250px] h-[250px]' />
                    </div>
                    <div className='flex justify-between items-center w-full mt-5'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' value={isUser?.name || "Not provided!"} className='p-2 rounded-md outline-none bg-[#707370]' />
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={isUser?.email || "Not provided!"} className='p-2 rounded-md outline-none bg-[#707370]' />
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" id='phoneNumber' value={isUser?.phoneNumber || "Not provided!"} className='p-2 rounded-md outline-none bg-[#707370]' />
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <label htmlFor="role">Role</label>
                        <input type="text" id='role' value={isUser?.role || "Not provided!"} className='p02 rounded-md outline-none bg-[#707370] p-2' />
                    </div>
                    <div className='flex w-full items-center'>
                        <div className='w-full'>
                            Allowed Path:
                        </div>
                        <div>
                            {allowedPaths}
                        </div>
                    </div>
                    <div className='flex w-full items-center'>
                        <div className='w-1/2'>
                            Created at:
                        </div>
                        <div>
                            {isUser?.createdAt?.slice(0, 10)}
                        </div>
                    </div>
                    <div className='flex w-full items-center'>
                        <div className='w-1/2'>
                            Updated at:
                        </div>
                        <div>
                            {isUser?.updatedAt?.slice(0, 10)}
                        </div>
                    </div>
                <RippleButton className={`bg-green-500 rounded-md mt-5 p-2 w-3/10 font-semibold tracking-wide cursor-pointer`}>
                    Update
                </RippleButton>
            </form>
    </div>
  )
}

export default Settings