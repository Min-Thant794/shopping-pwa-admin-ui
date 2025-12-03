import React, { useEffect, useState } from 'react'
import { getAllRole } from '../services/role.service';
import RippleButton from './RippleButton';
import { createUser, updateUserData } from '../services/user.service';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";

const UserModal = ({ setIsAddingUser, setUsers, isUpdatingUser, isAddingUser, userData = null, setIsUpdatingUser }) => {
  const [username, setUsername] = useState(userData?.name || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleFetchRole = async () => {
    try {
      const response = await getAllRole();
      if(response.success){
        setRole(response.data)
      }
    } catch (error) {
      console.log("handleFetchRole() Error", error);
    }
  }

  useEffect(()=>{
    handleFetchRole();
  }, [])

  const handleCreateUser = async () => {
    if(!selectedRole) {
      toast.warn("Please select a role for the user");
    }
    try {
      const response = isAddingUser ?
        await createUser({
          name: username,
          password,
          role: selectedRole
        })
        :
        // await updateUserRole(userData?._id, {role: selectedRole});
        await updateUserData(userData?._id, { name: username, role: selectedRole });
      console.log("Create/Update response:", response);
      if(response.success){
        toast.success(response?.message)
        setIsAddingUser(false)
        setIsUpdatingUser(false)
        setSelectedRole(null)
        setUsername("")
        console.log("Response handleCreateUser()", response.data)
        isAddingUser ?
          setUsers(prev => [...prev, response.data])
          :
          setUsers(prev => prev.map(user => user?._id === userData?._id ? response.data : user));
      }
    } catch (error) {
      console.log("handleCreateUser()", error);
    }
  }

  // const handleUpdateUser = async () => {
  //   try {
  //     const response = await updateUserData({
  //       name: username,
  //       password,
  //       role: selectedRole
  //     })

  //     if(response.success){
  //       toast.success(response?.message)
  //       setIsAddingUser(false);
  //       setIsUpdatingUser(false);

  //       setUsers((prev) => {
  //         prev.map((user) => user?._id === userData._id ? response.data : user)
  //       })
  //     }
  //   } catch (error) {
  //     console.log("handleUpdateUser() Error!", error);
  //   }
  // }

  useEffect(() => {
    if(isUpdatingUser && userData) {
      setUsername(userData.name);
      setPassword(userData.password.slice(1, 10));
      setSelectedRole(userData.role?._id);
    }
  }, [isUpdatingUser, userData])

  return (
    <div
    className='w-17/20 h-18/20 flex justify-center items-center bg-black/20 absolute'>
        <form
        onSubmit={(e) => {
          e.preventDefault()
          // isUpdatingUser ? handleUpdateUser() :
          handleCreateUser();
        }}
        className='flex flex-col bg-[#383838] w-full max-w-lg rounded-md px-3 py-2 shadow-xl'>
            <div className='w-full flex justify-end'>
              <button type='button' className='right-0 cursor-pointer active: opacity-75'>
                <IoMdClose
                onClick={() => {
                  setIsAddingUser(false)
                  setIsUpdatingUser(false)
                  setSelectedRole(null)
                  setUsername("")
                }}
                className='text-2xl font-bold'/>
              </button>
            </div>
            <div className='flex flex-col gap-3'>
              <h1 className='text-xl text-amber-50 py-3 text-center font-bold tracking-wide'>{isUpdatingUser? "Update" : "Add"} User</h1>
              <div className='flex gap-5 w-full justify-center items-center'>
                  <input type="text" value={username} onChange={(e) => {
                    setUsername(e.target.value)
                  }} className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='Enter Username' />
                  {
                    isAddingUser ? <input type="password" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                  }} className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='Password' />
                  :
                  ""
                  }
              </div>
              <div className='flex flex-col text-amber-50 gap-3 w-full justify-center items-start px-7'>
                <div className='text-lg font-bold tracking-wide'>
                  Role:
                </div>
                {
                  role.length > 0 ?
                    <div className='grid grid-cols-3 gap-3 w-full text-center'>
                      {
                        role?.map((item, index) => (
                          <div
                          key={index}
                          onClick={() => {setSelectedRole(item?._id)
                          }}
                          className={`text-md font-bold px-2 py-1 rounded-md cursor-pointer tracking-wide ${selectedRole === item?._id ? "bg-[#5e5f5e] text-amber-50" : "bg-[#B5BAB5] text-gray-900"}`}>
                            {item.name}
                          </div>
                        ))
                      }
                    </div>
                    :
                    <div className='p-2 font-bold tracking-wide'>
                      Loading...
                    </div>
                }
                <div className='flex w-full justify-end mb-5'>
                  <RippleButton
                  type="submit"
                  className={'bg-green-500 px-3 py-2 rounded-md font-bold tracking-wide cursor-pointer'}>
                    {isUpdatingUser ? "Update User" : "Create User"}
                  </RippleButton>
                </div>
              </div>
            </div>
        </form>
    </div>
  )
}

export default UserModal