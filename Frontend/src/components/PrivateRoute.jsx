import {Navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'




export default function PrivateRoute() {

    const {userInfo}=useSelector(state=>state.auth)


  return userInfo ? <Outlet/> :<Navigate to='/login' replace/>
  // Prrivate routing is here
  // Private route is nothing like a new concept is just the way we use outlet
  // As above we are using <outlet/> component it will be return if userInfo is present 
  //OtherWise it will navigate to '/login'
}
