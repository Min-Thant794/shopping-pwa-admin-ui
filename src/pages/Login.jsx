import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { videos } from '../constants'
import { useNavigate, createBrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setItemToLocalStorage } from '../helpers/helper';
import RippleButton from '../components/RippleButton';
import { API_ROUTES, STORAGE_KEY } from '../config/config';
import axiosInstance from '../config/axiosInstance';
import { useUser } from '../context/UserContext';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [getStarted, setGetStarted] = useState(true);
  const {setUserData} = useUser();

  const toggleGetStarted = () => setGetStarted(!getStarted);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if(userName.trim() === ""){
        return alert("Please Enter Username!")
      }else if(password.trim() === ""){
        return alert("Please Enter Password!")
      }

      const response = await axios.post("http://localhost:8080/api/v1/user/login", 
        {
        name: userName,
        password: password
      })

      console.log("response", response);
      if (response.data.success) {
        setUserData(response.data.data);
        setItemToLocalStorage("user-data", response.data.data);
        setItemToLocalStorage(STORAGE_KEY.TOKEN, response.data.token);
        // const role = response.data.data.role;
        // console.log("User role", role);
        // const allowedPath = response?.data?.data?.allowedPath;
        // console.log("allowed path", response.data.data)

        setIsLoading(!isLoading)
        toast.success("Successfully Login!");
        
        setTimeout(() => {
            setIsLoading(false)
            navigate("/dashboard")
            window.location.reload()
        }, 500);
      } else {
        BiSolidCommentError("Invalid credentials, please try again.")
      }

    } catch (error) {
      console.log("An Error Occurred!", error)
      const errorResponse = error;
      toast.error(errorResponse.response.data.data.message || "Login Failed!");
    }
  }

  return (
    window.innerWidth >= 768 ?
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
              <div className='flex items-center justify-between pr-3 cursor-pointer'>
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
              {
                isLoading?
                "Loading..."
                :
                "Login"
              }
            </RippleButton>
          </form>
        </div>
      </div>
      :
      <div className='flex flex-col justify-center relative'>
        {getStarted &&
        <div>
          <div className='flex absolute top-140 w-8/9 pl-11'>
          <RippleButton 
            onClick={toggleGetStarted}
            className='p-3 w-full bg-third/90 font-bold text-txtColor rounded-3xl z-50'>
              Get Started
            </RippleButton>
          </div>
          <div className='h-screen sticky top-0 object-fill'>
            <video 
            src={videos}
            autoPlay
            muted
            loop
            className='h-screen object-fill'
            />
          </div>
        </div>
        }
        <form className='flex h-screen flex-col gap-3 py-5 px-3 items-center justify-center backgroundGradient opacity-90'>
          <div className='font-bold text-3xl tracking-wide text-txtColor'>
            Welcome Back!
          </div>
          <div className='font-semibold text-center text-xl tracking-wide w-full text-txtColor'>
            Sign Up To Get Started
          </div>
          <div className='flex flex-col w-8/9 gap-2 font-semibold rounded-sm text-txtColor'>
            <label htmlFor="username" >
              Username
            </label>
            <input type="text" id='username' value={userName} placeholder='Enter Your Username' className='rounded-sm bg-white/20 p-3 outline-none' onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className='flex flex-col gap-2 w-8/9 font-semibold text-txtColor'>
            <label htmlFor="password">
              Password
            </label>
            <div className='flex items-center rounded-sm justify-between bg-white/20 p-3'>
              <input type={isShowPassword ? 'text' : 'password'} id='password' value={password} placeholder='Enter Your Password' className='outline-none' onChange={(e) => setPassword(e.target.value)} />
              {
                isShowPassword ? 
                <FaEye onClick={() => setIsShowPassword(!isShowPassword)}/>
                :
                <FaEyeSlash onClick={() => setIsShowPassword(!isShowPassword)}/>
              }
            </div>
          </div>
          <RippleButton className='bg-third btnHover w-8/9 p-3 my-3 rounded-sm text-txtColor font-bold tracking-wide cursor-pointer'>
            {
              isLoading?
              "Loading..."
              :
              "Login"
            }
          </RippleButton>
        </form>
      </div>
  )
}

export default Login