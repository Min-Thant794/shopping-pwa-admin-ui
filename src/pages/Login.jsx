import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { videos } from '../constants'
import { useNavigate, createBrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setItemToLocalStorage } from '../helpers/helper';
import RippleButton from '../components/RippleButton';
import { STORAGE_KEY } from '../config/config';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if(userName.trim() === ""){
        return alert("Please Enter Username!")
      }else if(password.trim() === ""){
        return alert("Please Enter Password!")
      }

      const response = await axios.post('http://localhost:8080/api/v1/user/login', 
        {
        name: userName,
        password: password
      })

      if (response.data.success) {
        const allowedPath = response.data.data.allowedPath;

        setItemToLocalStorage("user-data", response.data);
        setItemToLocalStorage(STORAGE_KEY.TOKEN, response.data.token)
        toast.success(response.data.message);
        const role = response.data.data.role;
        console.log("User role", role);

        navigate("/dashboard")
        // setTimeout(() => {
        //     //setIsLoading(false)
        //     //navigate({roleBasedRoutes})
        // }, 3000);
      } else {
        BiSolidCommentError("Invalid credentials, please try again.")
      }

    } catch (error) {
      console.log("An Error Occurred!", error)
      const errorResponse = error;
      toast.error(errorResponse.response.data.message || "Login Failed!");
    }
  }

  return (
    <div className='flex items-center justify-center h-screen backgroundGradient'>
      <div className='flex w-4/7'>
        <div className='w-1/2'>
          <video src={videos}
          autoPlay
          loop
          muted
          className=' rounded-l-md'
          />
        </div>
        <form action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className='flex flex-col bg-white/10 border-white/30 backdrop-blur-lg w-1/2 gap-5 px-20 p-5 rounded-r-md justify-center text-white'>
          <div className='font-bold text-3xl text-txtColor'>
            Welcome Back!
          </div>
          <div className='font-semibold text-xl w-full text-txtColor'>
            Sign Up To Get Started
          </div>
          <div className='flex flex-col font-semibold text-txtColor'>
            <label htmlFor="username" >
              Username
            </label>
            <input type="text" id='username' value={userName} placeholder='Enter Your Username' className='outline-none' onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className='flex flex-col font-semibold text-txtColor'>
            <label htmlFor="password">
              Password
            </label>
            <div className='flex items-center justify-between pr-3'>
              <input type={isShowPassword ? 'text' : 'password'} id='password' value={password} placeholder='Enter Your Password' className='outline-none' onChange={(e) => setPassword(e.target.value)} />
              {
                isShowPassword ? 
                <FaEye onClick={() => setIsShowPassword(!isShowPassword)}/>
                :
                <FaEyeSlash onClick={() => setIsShowPassword(!isShowPassword)}/>
              }
            </div>
          </div>
          <RippleButton className='bg-third btnHover p-2 rounded-sm text-txtColor font-bold tracking-wide cursor-pointer'>
            Login
          </RippleButton>
        </form>
      </div>
    </div>
  )
}

export default Login