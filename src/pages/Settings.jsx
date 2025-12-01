import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { updateUserData } from '../services/user.service'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import RippleButton from '../components/RippleButton';

const Settings = () => {
  const { userData, changeUserData } = useUser()
  const [ name, setName ] = useState(userData.name || "")
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState(userData.email || "Not Provided!");
  const [ phoneNumber, setPhoneNumber ] = useState(userData.phoneNumber);
  const [ file, setFile ] = useState(null);
  const [ previewImg, setPreviewImg ] = useState(userData?.imageUrl);
  const [ loading, setLoading ] = useState(false);
  const [ isShowPassword, setIsShowPassword ] = useState(false);

  const onChangeFile = (file) => {
    if(!file) return
    const url = URL.createObjectURL(file)
    setPreviewImg(url);
    setFile(file);
  }

  const allowedPaths = userData?.allowedPath?.map(path => path.substring(1)).join(", ");

  console.log("AllowedPaths ", allowedPaths)

  const triggerFileOpen = () => document.getElementById("fileupload").click();

  const handleUserUpdate = async () => {
    try {
        if(!previewImg && name === userData.name && email.trim() === ""){
            return toast.info("Validation failed!")
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("image", file);

        setLoading(true);
        const response = await updateUserData(userData._id, formData)
        console.log(response);

        if(response.success){
            changeUserData()
            toast(response.message + "Please Login Again!")
        }
    } catch (error) {
        console.log("Update user error", error)
    } finally{
        setLoading(false)
    }
  }

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='flex flex-col gap-3 p-3 justify-center items-center bg-[#383838] rounded-md w-5/15'>
            <h1 className='text-2xl text-amber-50 font-semibold tracking-wide'>User Information</h1>
            <form className='mt-4 flex flex-col w-fit gap-4 ' onSubmit={(e) => {
                e.preventDefault()
                handleUserUpdate()
            }}>

            <div className='flex flex-col items-center gap-2'>
                <img src={previewImg} alt="" className='w-full h-60 rounded-md  cursor-pointer ' />
                <div className='text-md font-semibold tracking-wide cursor-pointer active:bg-gray-700 bg-gray-800 text-white px-4 py-1 rounded-md'
                    onClick={triggerFileOpen}>
                    Edit
                </div>
                <input type="file" multiple={false} accept='image/*' className='hidden' id='fileupload' onChange={(e) => onChangeFile(e.target.files[0])} />
            </div>

            <div className='grid grid-cols-3 gap-2 items-center justify-between'>
                <label htmlFor="name" className='text-amber-50 font-bold text-md tracking-wide'>Username</label>
                <input value={name} type="text" id='name' placeholder='Enter Name' className='grid font-semibold col-span-2 p-2 outline-none bg-slate-100 rounded-md'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='grid grid-cols-3 gap-2 items-center justify-between'>
                <label htmlFor="email" className='text-amber-50 font-bold tracking-wide'>Email</label>
                <input value={email} type="email" id="email" placeholder='Enter Email' className='grid col-span-2 font-semibold p-2 outline-none bg-slate-100 rounded-md'
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='grid grid-cols-3 gap-2 items-center justify-between'>
                <label htmlFor="phoneNumber" className='text-amber-50 font-bold tracking-wide'>Phone Number</label>
                <input value={phoneNumber} type="text" id='phoneNumber' placeholder='Enter Phone Number' className='grid col-span-2 font-semibold p-2 outline-none bg-slate-50 rounded-md' 
                    onChange={(e) => setPhoneNumber(e.target.value)}/>
            </div>
            <div className='grid grid-cols-3 gap-2 items-center justify-between'>
                <label htmlFor="allowedPaths" className='text-amber-50 font-bold tracking-wide'>Allowed Paths</label>
                <div className='grid col-span-2 font-semibold p-2 bg-slate-50 rounded-md'>
                    {allowedPaths}
                </div>
            </div>
            <div className='grid grid-cols-3 gap-2 items-center justify-between'>
                <label htmlFor="password" className='text-amber-50 font-bold tracking-wide'>Password</label>
                <div className='grid grid-cols-7 col-span-2 items-center bg-slate-100 rounded-md'>
                    <input value={password} type={isShowPassword ? 'text' : 'password'} id='password' placeholder='•••••••••' className='font-semibold p-2 col-span-6 outline-none'
                    onChange={(e) => setPassword(e.target.value)} />
                    <div className=''>
                        {
                            isShowPassword ?
                            <FaEye 
                            className='active:opacity-70'
                            onClick={() => setIsShowPassword(!isShowPassword)} />
                            :
                            <FaEyeSlash 
                            className='active:opacity-70'
                            onClick={() => setIsShowPassword(!isShowPassword)} />
                        }
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <RippleButton
                    disabled={loading}
                    className={`bg-green-500 active:bg-green-300 w-fit px-4 py-1 rounded-md text-white disabled:bg-green-200 disabled:cursor-not-allowed`}
                >
                    Update
                </RippleButton>
            </div>
            </form >
        </div >
    </div>
  )
}

export default Settings