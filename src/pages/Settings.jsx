import React, { useEffect, useState, useRef } from 'react'
import RippleButton from '../components/RippleButton';
import { FaUserEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from '../context/UserContext';
import { updateUserData } from '../services/user.service';
import {toast} from 'react-toastify'

const Settings = () => {

    const {userData, changeUserData} = useUser();
    //console.log("is User:", userData);
    const [isEdit, setIsEdit] = useState(false);

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[phoneNumber, setPhoneNumber] = useState('')
    const[password, setPassword] = useState('')
    const[role, setRole] = useState('')
    const[file, setFile] = useState(null)
    const[previewImg, setPreviewImg] = useState();
    const[passwordUpdate, setPasswordUpdate] = useState(false);
    const[isShowPassword, setIsShowPassword] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if(userData){
            setName(userData.name || "Not Provided!")
            setEmail(userData.email || "Not Provided!")
            setPhoneNumber(userData.phoneNumber || "Not Provided!")
            setPassword('')
            setRole(userData.role)
            setPreviewImg(userData.imageUrl || null)
        }
    }, [userData])

    const triggerFileOpen = () => {
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const onChangeFile = (file) => {
        if(!file) return
        {
            const url = URL.createObjectURL(file)
            setPreviewImg(url)
            setFile(file)
        }
    }

    const allowedPaths = userData?.role?.allowedPath?.map(path => path.substring(1)).join(", ");

    const handleUserUpdate = async () => {
        try {
            if(!name.trim() || !email.trim()){
                return toast.info("Name and email are required!")
            }
            const formData = new FormData();
            formData.append("name", name)
            formData.append("email", email)
            formData.append("phoneNumber", phoneNumber)
            
            if(password.trim() !== ''){
                formData.append("password", password)
            }

            if(file){
                formData.append("image", file)
            }

            const response = await updateUserData(userData._id, formData)
            //console.log("Form Data", formData.getAll("image"))

            if(response?.success){
                const updatedData = response.data || response.updatedUser
                console.log("response.updateduser: ", response.updatedUser)
                changeUserData(updatedData)
                toast.success(response.message)
                setFile(null)
            }else{
                toast.error(response.message || "Update Failed!")
            }
        } catch (error) {
            console.log("An error occurred in triggerFileOpen()", error)
            toast.error("An Error Occurred During Update")
        }
    }

  return (
    <div className='flex justify-center'>
            <form
            className='flex flex-col justify-center text-amber-50 font-semibold items-center px-10 py-5 rounded-lg w-5/15 gap-3 bg-[#383838] mb-5 mt-10'
            onSubmit={(e) => {e.preventDefault() 
                handleUserUpdate()}}
            action="">
                <h1 className='text-3xl font-semibold'>
                    User Information
                </h1>
                <div className='mt-5 relative'>
                    <img src={previewImg} className='rounded-md w-[350px] h-[250px] select-none' />
                    {
                        isEdit &&
                        <div
                        onClick={triggerFileOpen}
                        className='flex absolute cursor-pointer active:opacity-80 left-45 top-50 gap-3 w-5/11 rounded-sm justify-center items-center p-1 bg-red-600'>
                            Upload Photo
                            <FaUserEdit
                            className='text-3xl' />
                            <input
                            type="file" id='fileUpload'
                            ref={fileInputRef} 
                            multiple={false}
                            onChange={(e) => onChangeFile(e.target.files[0])}
                            className='hidden'/>
                        </div>
                    }
                </div>
                <div className='flex justify-between items-center w-full mt-5'>
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    id='username'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEdit}
                    className='p-2 rounded-md outline-none bg-[#707370]' />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    id='email'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEdit}
                    className='p-2 rounded-md outline-none bg-[#707370]' />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input 
                    type="text" id='phoneNumber' 
                    value={phoneNumber} 
                    name='phoneNumber'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={!isEdit}
                    className='p-2 rounded-md outline-none bg-[#707370]' />
                </div>

                {
                    passwordUpdate?
                    <div className='flex justify-between items-center w-full'>
                        <label htmlFor="password">Password</label>
                        <div className='flex justify-between p-2 items-center rounded-md bg-[#707370]'>
                            <input
                            type={isShowPassword ? 'text': 'password'}
                            value={password}
                            name='password'
                            placeholder='Update Password'
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={!isEdit}
                            className='outline-none placeholder:font-semibold'
                            />
                            {
                                isShowPassword ?
                                <FaEye onClick={() => setIsShowPassword(!isShowPassword)}/>
                                :
                                <FaEyeSlash onClick={() => setIsShowPassword(!isShowPassword)}/>}
                        </div>
                    </div>
                :
                    <div className='flex justify-between items-center w-full'>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="text"
                        name='password'
                        placeholder={`•••••••`}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={!isEdit}
                        className='p-2 rounded-md outline-none bg-[#707370] placeholder:font-bold placeholder:text-2xl'
                        />
                    </div>
                }

                <div className='flex justify-between items-center w-full'>
                    <label htmlFor="role">Role</label>
                    <input 
                    type="text" 
                    id='role'
                    value={role}
                    disabled
                    className='rounded-md outline-none bg-[#707370] p-2' />
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
                        {userData?.createdAt?.slice(0, 10)}
                    </div>
                </div>
                <div className='flex w-full items-center'>
                    <div className='w-1/2'>
                        Updated at:
                    </div>
                    <div>
                        {userData?.updatedAt?.slice(0, 10)}
                    </div>
                </div>
                <div 
                onClick = {() => {setIsEdit(!isEdit)
                    setPasswordUpdate(!passwordUpdate)
                }}
                className={`bg-green-500 rounded-md mt-5 w-3/10 active:opacity-80 font-semibold tracking-wide`}>
                    <RippleButton
                    className={`w-full p-2 cursor-pointer`}>
                        {isEdit ? "Update" : "Edit"}
                    </RippleButton>
                </div>
            </form>
    </div>
  )
}

export default Settings