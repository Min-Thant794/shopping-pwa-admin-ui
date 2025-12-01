import React, { useEffect, useState } from 'react'
import { routes } from '../config/Routes'
import RippleButton from './RippleButton';
import { addNewRole, updateRole } from '../services/role.service';
import { toast } from 'react-toastify';

const RoleModal = (props) => {
  const {setIsAddingRole, dataToUpdate, isUpdatingRole, setIsUpdatingRole, setDataToUpdate} = props
  const [allowedPaths, setAllowedPaths] = useState(dataToUpdate?.allowedPaths || []);
  const [name, setName] = useState(dataToUpdate?.name || "");
  const [description, setDescription] = useState(dataToUpdate?.description || "");

  const clearInput = () => {
    isUpdatingRole ? setIsUpdatingRole(false) : setIsAddingRole(false)
    setAllowedPaths([])
    setName("")
    setDescription("")
    setDataToUpdate(null)
  }

  const handleSelectedPaths = (path) => {
    if(allowedPaths.includes(path)){
        setAllowedPaths(allowedPaths.filter(item => item !== path))
    }else{
        setAllowedPaths(prev => [...prev, path]);
    }
  }

  const navRoutes = routes.find((route) => route.children);
  
  const handleCreateUpdateRole = async () => {
    if(!name || name.trim() === "" || allowedPaths.length === 0) 
        return toast.warn("Invalid Input!")
    try {
        const commonPayload = {
            name,
            description: description || "",
            allowedPaths
        }
        const finalDbFn = isUpdatingRole ? updateRole({...commonPayload, id:dataToUpdate._id}) : addNewRole(commonPayload)
        const response = await finalDbFn
        if(response.success){
            toast.success(response.message)
            clearInput()
        }
    } catch (error) {
        console.log("An error occurred at handleCreateRole()", error)
    }
  }

  return (
    <div
    onClick={() => {
        setIsAddingRole(false)
    }}
    className='w-17/20 h-18/20 flex justify-center items-center bg-black/20 absolute'>
        <div 
        onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}
        className='flex flex-col bg-[#383838] w-full max-w-lg rounded-md px-3 py-2 gap-5 shadow-xl'>
            <h1 className='text-lg text-amber-50 px-7 font-bold tracking-wide'>{isUpdatingRole ? `Update  permission for ${dataToUpdate?.name}` : "Create New Role"}</h1>
            <div className='flex gap-5 w-full justify-center items-center'>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='Role Name' />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='bg-amber-50 rounded-md py-2 px-3 outline-none focus-none' placeholder='Description' />
            </div>
            <h1 className='text-lg text-amber-50 px-7 font-bold tracking-wide'>Permitted Page</h1>
            <div className='grid grid-cols-3 gap-3 px-7'>
                {
                    navRoutes?.children?.filter((child) => child.name).map((child) => (
                        <div 
                        key={child.path}
                        onClick={() => handleSelectedPaths(child.path)}
                        className={`px-3 text-center h-full ${allowedPaths.includes(child.path) ? 'bg-black' : 'bg-[#B5BAB5]'} rounded-sm py-1 cursor-pointer active:opacity-70 text-amber-50 font-semibold tracking-wide`}>
                                {child?.name}
                        </div>
                    ))
                }
            </div>
            <div className='grid grid-cols-6 items-center gap-3 px-7 my-3'>
                <RippleButton 
                onClick={handleCreateUpdateRole}
                className={'px-3 py-2 col-span-4 cursor-pointer bg-green-400 rounded-md font-bold text-lg text-amber-50 tracking-wide'}>
                    {
                        isUpdatingRole ? "Update" : "Create"
                    }
                </RippleButton>
                <RippleButton 
                onClick={() => {
                    clearInput()
                }}
                className='flex items-center col-span-2 justify-center cursor-pointer py-2 font-bold text-lg text-amber-50 bg-red-500 rounded-md'>
                    Cancel
                </RippleButton>
            </div>
        </div>
    </div>
  )
}

export default RoleModal