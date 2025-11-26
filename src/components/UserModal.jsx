import React from 'react'

const UserModal = ({ action = "Add" }) => {
  return (
    <div className='w-17/20 h-18/20 flex justify-center items-center bg-black/20 absolute'>
        <form className='flex flex-col bg-[#383838] w-full max-w-lg rounded-md px-3 py-2 gap-3 shadow-xl'>
            <h1 className='text-lg text-amber-50 text-center font-bold tracking-wide'>{action} User</h1>
            <div className='flex gap-5 w-full justify-center items-center'>
                <input type="text" className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='username' />
                <input type="text" className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='email' />
            </div>
            <div className='flex gap-5 w-full justify-center items-center'>
                <input type="text" className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='Phone Number' />
                <input type="email" className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='email' />
            </div>
        </form>
    </div>
  )
}

export default UserModal