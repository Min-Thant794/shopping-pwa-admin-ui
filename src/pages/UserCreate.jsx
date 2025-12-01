import React, { useEffect, useState } from 'react'
import { getAllAdmin } from '../services/user.service'
import RippleButton from '../components/RippleButton'
import { MdAutoDelete } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import UserModal from '../components/UserModal';
import { FaUsersCog } from "react-icons/fa";
import RoleModal from '../components/RoleModal';
import ManageRoleModal from '../components/ManageRoleModal';

//put the user create form as a component
const UserCreate = () => {

  const[allUsers, setAllUsers] = useState([]);
  const[isAddingUser, setIsAddingUser] = useState(false);
  const[isAddingRole, setIsAddingRole] = useState(false);
  const[isRoleClicked, setIsRoleClicked] = useState(false);
  const[isManagingRole, setIsManagingRole] = useState(false);
  const[dataToUpdate, setDataToUpdate] = useState("");
  const[isUpdatingRole, setIsUpdatingRole] = useState(false);
  const[isUpdatingUser, setIsUpdatingUser] = useState(false);
  const[userData, setUserData] = useState(null)

  const handleGetAllUsers = async () => {
    try {
      const response = await getAllAdmin()
      if (response?.success){
        setAllUsers(response.data)
      }
    } catch (error) {
      console.log("Error Occurred Durnig Fetching Users", error)
    }
  }

  useEffect(() => {
    handleGetAllUsers()
  }, [])

  useEffect(() => {
    console.log("All users", allUsers)
  }, [allUsers])

  const dataLength = allUsers?.length || 0

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-3 items-center relative'>
        <RippleButton 
        onClick={() => {
          setIsAddingUser(true)
          setIsUpdatingUser(false)
        }}
        className='flex items-center gap-3 justify-center bg-[#383838] rounded-md w-1/7 cursor-pointer shadow-xl text-center text-amber-50 tracking-wide font-semibold px-3 py-2'>
          Create New User
          <IoPersonAdd className='text-xl'/>
        </RippleButton>
        <RippleButton 
        onClick={() => setIsRoleClicked(!isRoleClicked)}
        className='flex items-center gap-3 justify-center bg-[#383838] rounded-md w-1/8 cursor-pointer shadow-xl text-center text-amber-50 tracking-wide font-semibold px-3 py-2'>
          Select Role
          <FaUsersCog className='text-xl' />
        </RippleButton>
        {
          isRoleClicked &&
          <div className='gap-3 absolute right-0 w-3/12 flex text-center cursor-pointer font-semibold text-amber-50'>
            <RippleButton
            onClick={() => {
              setIsManagingRole(!isManagingRole)
              setIsRoleClicked(false);
            }}
            className={'w-full cursor-pointer bg-[#383838] px-3 py-2 shadow-md rounded-lg'}
            >
              Manage Role
            </RippleButton>
            <RippleButton
            onClick={() => {
              setIsAddingRole(!isAddingRole)
              setIsRoleClicked(false)
            }}
            className={'w-full cursor-pointer bg-[#383838] px-3 py-2 shadow-md rounded-lg'}
            >
              Create Role
            </RippleButton>
          </div>
        }
      </div>
      <div className='w-full text-center py-3 text-lg font-semibold'>
        Total {dataLength} {dataLength > 1 ? "Users" : "User"} available in this website.
      </div>
      {
        allUsers.length > 0 ?
        <div className="grid grid-cols-4 gap-3">
          {allUsers.map((user, index) => (
            <div key={user?._id || index} className="bg-[#B5BAB5] col-span-1 grid grid-cols-3 px-3 items-center gap-5 justify-center p-2 rounded-md shadow-xl shadow-black/10">
              {user?.imageUrl && (
                <img src={user?.imageUrl} className='rounded-full shadow-md' alt="" />
              )}
              <div className='font-semibold'>
                <div className='font-bold'>
                  Username
                </div>
                {user?.name}
              </div>
              <div className='font-semibold'>
                <div className='font-bold'>
                  Role
                </div>
                {user?.role?.name}
              </div>
              <div className='font-semibold col-span-2'>
                <div className='font-bold'>
                  Email
                </div>
                {user.email || "No Email Provided!"}
              </div>
              <RippleButton 
              onClick={() => {
                setIsUpdatingUser(true)
                setIsAddingUser(false)
                setUserData(user)
              }}
              className={"w-full px-3 py-2 rounded-md cursor-pointer bg-[#383838] font-semibold tracking-wider text-amber-50"}>
                Edit
              </RippleButton>
              <div className='col-span-2 flex'>
                <div className='font-bold'>Active Status-</div>
                <div className='font-semibold'>
                  {user?.active ? " Active": " Inactive"}
                </div>
              </div>
              <div className='font-bold items-center'>
                <div>
                  Action
                </div>
                  <div className='flex gap-3 items-center'>
                    <div className='bg-amber-400 rounded-full flex items-center p-1 active:opacity-70 cursor-pointer'>
                      <MdAutoDelete className='text-xl' />
                    </div>
                    <div className='bg-red-500 rounded-full flex items-center p-1 active:opacity-70 cursor-pointer'>
                      <MdDelete className='text-xl' />
                    </div>
                  </div>
              </div>
            </div>
          ))}
      </div>
      :
      <div className='text-xl font-semibold'>
        Loading...
      </div>
      }
      {
        (isAddingUser || isUpdatingUser) ?
        <UserModal
          setIsAddingUser={setIsAddingUser}
          setUsers={setAllUsers}
          isUpdatingUser={isUpdatingUser}
          isAddingUser={isAddingUser}
          userData={userData}
          setIsUpdatingUser = {setIsUpdatingUser}
        />
        :
        ""
      }
      {
        isAddingRole || isUpdatingRole ?
        <RoleModal
          setIsAddingRole={setIsAddingRole}
          isUpdatingRole={isUpdatingRole}
          dataToUpdate={dataToUpdate}
          setIsUpdatingRole={setIsUpdatingRole}
          setDataToUpdate={setDataToUpdate}
        /> : null
      }
      {
        isManagingRole &&
        <ManageRoleModal
        setIsManagingRole = {setIsManagingRole}
        setDataToUpdate = {setDataToUpdate}
        setIsUpdatingRole = {setIsUpdatingRole}
        />
      }
    </div>
  )
}

export default UserCreate