import React, { useEffect, useState } from 'react'
import { getAllRole } from '../services/role.service'
import { FiEdit } from "react-icons/fi";

const ManageRoleModal = (props) => {
  const {setIsManagingRole, setIsUpdatingRole, setDataToUpdate} = props;
  const [allRoles, setAllRoles] = useState([])

const handleGetAllRole = async () => {
    try {
        const response = await getAllRole();
        if(response.success){
            setAllRoles(response.data);
        }
    } catch (error) {
        console.log("An Error Occurred During handleGetAllRole()", error);
    }
  }

  useEffect(() =>{
    handleGetAllRole();
  },[])

  return (
    <div 
    onClick={() => setIsManagingRole(prev => !prev)}
    className='w-17/20 h-18/20 flex justify-center items-center bg-black/20 absolute'>
        <div 
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col bg-[#383838] w-full max-w-xl max-h-120 overflow-auto hide-scrollbar rounded-md p-3 gap-5 shadow-xl'>
            <h1 className='text-xl font-semibold text-amber-50'>
                All Roles
            </h1>
            <div className='flex flex-col col-span-2 w-full gap-3 justify-center items-center'>
                {
                    allRoles.map(role => (
                        <div
                        key={role.name}
                        className='w-full items-center grid grid-cols-3 gap-3 bg-[#7f7f7f] justify-between px-3 rounded-lg py-2 font-semibold text-amber-50'>
                            <div className='w-full justify-between flex items-center rounded-md gap-3 text-md font-bold'>
                                {role?.name?.toUpperCase()}
                                <button 
                                onClick={() => {
                                    setDataToUpdate(role)
                                    setIsUpdatingRole(true)
                                    setIsManagingRole(false)
                                }}
                                className={'cursor-pointer active:opacity-60'}>
                                    <FiEdit className='text-lg' />
                                </button>
                            </div>
                            <div className='text-xs text-center items-center grid grid-cols-3 col-span-2 p-2 gap-3 bg-[#383838] rounded-md'>
                                {role?.allowedPaths?.map(path => (
                                    <div className='uppercase p-2 border-2 rounded-md border-[#7f7f7f]'>
                                        {
                                            path.slice(1, path.length)
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ManageRoleModal