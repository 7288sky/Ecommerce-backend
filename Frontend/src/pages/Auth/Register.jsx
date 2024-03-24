import {useState ,useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/featires/auth/authSlice'
import { toast } from 'react-toastify';
import {useRegisterMutation} from '../../redux/Api/userApiAlice'

function Register() {
    const [username,setUserName]=useState('');
    const[email,setemail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('')
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [register,{isLoading}]=useRegisterMutation();

    const {userInfo}=useSelector(state=>state.auth)
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(()=>{
        if(userInfo){
            console.log(redirect)
            navigate(redirect)
        }
    },[navigate,redirect,userInfo])

const submitHandler=async(e)=>{
e.preventDefault();

console .log("hello")
console.log({username,email,password,confirmPassword})
if(password!=confirmPassword){
    toast.error('Password do not match')
}

try {
    const res=await register({username,email,password}).unwrap()
    dispatch(setCredentials({...res}))
    navigate(redirect);
    toast.success('User successfully registered')
} catch (error) {
    console.error(error)
    toast.error(error.data.message)
}

}

  return (
   <section className='pl-[5rem] flex flex-wrap'>
    <div className='mr-[4rem] mt-[5rem]'>
        <h1 className='text-2xl font-semibold mb-4'>register</h1>

    <form onSubmit={submitHandler} className='container w-[40rem]'>
        <div className='my-[2rem]'>
    <label htmlFor='name' className='block text-sm font-medium text-white'>Name</label>
    <input type='text' id='name' className='mt-1 p-2 border rounded w-full' placeholder='Enter your name' value={username} onChange={e=>setUserName(e.target.value)}></input>
        </div>
        <div className='my-[2rem]'>
    <label htmlFor='email' className='block text-sm font-medium text-white'>Email Address</label>
    <input type='email' id='email' className='mt-1 p-2 border rounded w-full' placeholder='Enter your email' value={email} onChange={e=>setemail(e.target.value)}></input>
        </div>
        <div className='my-[2rem]'>
    <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
    <input type='password' id='password' className='mt-1 p-2 border rounded w-full' placeholder='Enter your password' value={password} onChange={e=>setPassword(e.target.value)}></input>
        </div>
        <div className='my-[2rem]'>
    <label htmlFor='confirmPassword' className='block text-sm font-medium text-white'>Confirm password</label>
    <input type='text' id='confirmPassword' className='mt-1 p-2 border rounded w-full' placeholder='Confirm password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></input>
        </div>

    <button type='submit' className=' bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]' disabled={isLoading}>
        {isLoading ? "Regestrig ..." :"Register"}
    </button>

    {isLoading &&<Loader/>}

    </form>


    <div className='mt-4'>
        <p className='text-white'>
            Already have an account ? {" "}
            <Link to={redirect ? `/login?redirect=${redirect}`:'/login'} className='text-pink-500 hover:underline'>Login</Link>
        </p>
    </div>
    </div>
    {/* <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[40rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg"
      /> */}
   </section>
  )
}

export default Register