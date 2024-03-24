
import { useState,useEffect } from "react"

import {Link,useLocation,useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useLoginMutation} from '../../redux/Api/userApiAlice'
import {setCredentials} from '../../redux/featires/auth/authSlice'
import {toast} from 'react-toastify'
import Loader from "../../components/Loader"


const Login = () => {

    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [login,{isLoading}]= useLoginMutation();
    const {userInfo}=useSelector(state=>state.auth)
    const {search}=useLocation();
    const sp=new URLSearchParams(search)
    const redirect =sp.get('/redirect')||'/'
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

    const submitHandler=async(e)=>{
        e.preventDefault()
        try {
            // I have to start from here
            const res= await login({email,password}).unwrap();
            dispatch(setCredentials({...res}))
        } catch (error) {
            toast.error(error?.data?.message||error.message)
        }
    }


  return (
    <div>
    <section className="pl-[5rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font -semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
    <div className="my-[2rem]">
        <label htmlFor="email"
         className="block text-sm font-medium text-white"
         >Email Address</label>
        <input type="email" 
        id="email" 
        className="mt-1 p-2 border rounded w-full"
           value={email}
           onChange={e=>setEmail(e.target.value)} 
        />

        
    </div>
    <div className="my-[2rem]">
        <label htmlFor="email"
         className="block text-sm font-medium text-white"
         >Password</label>
        <input type="password" 
        id="password" 
        className="mt-1 p-2 border rounded w-full"
           value={password}
           onChange={e=>setPassword(e.target.value)} 
        />
    </div>
    <button disabled={isLoading} type="submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading?"Signing In...":"Sign In"}</button>
    {isLoading&&<Loader/>}
        </form>

    <div className="mt-4">
        <p className="text-white">
            New Customer ? {" "}
            <Link to={redirect ? `/register?redirect=${redirect}`:'/register'} className="text-pink-500 hover:underline">Register</Link>
        </p>
    </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[40rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg"
        />
    </section>
    </div>
  )
}

export default Login


// explanation of redirect
// This is a React Router Link component. It's used to navigate between different routes in a React application. The to prop specifies the path to navigate to when the link is clicked.
// In this case, the to prop is a ternary operator. It checks if the redirect prop is truthy. If it is, it constructs a path to the /register route with a query parameter redirect set to the value of the redirect prop. If redirect is falsy, it constructs a path to the /register route without any query parameters.
// Here's a breakdown of the path construction:
// If redirect is truthy (like /dashboard), the path will be /register?redirect=/dashboard.
// If redirect is falsy, the path will be /register.
// The className prop is used to apply CSS classes to the link. In this case, it applies the classes text-pink-500 and hover:underline. The text-pink-500 class sets the text color to a shade of pink, and the hover:underline class underlines the link when it's hovered over.