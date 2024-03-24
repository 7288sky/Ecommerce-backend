
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'


//Private Route
import PrivateRoute from './components/PrivateRoute.jsx'

//Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

import Profile from './pages/users/Profile.jsx'

import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import Order from './pages/Orders/Order.jsx'
import UserOrder from './pages/users/UserOrder.jsx'
import OrderList from './pages/Admin/OrderList.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}> 
    <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route index={true} path='/' element={<Home/>}/>

      <Route path='/favorite' element={<Favorites/>} />
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/user-orders' element={<UserOrder/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/shipping' element={<Shipping/>}/>
      <Route path='/placeorder' element={<PlaceOrder/>}/>
      <Route path='/order/:id' element={<Order/>}/>
      </Route>

    {/*Admin Routes */}

    <Route path='/admin' element={<AdminRoute/>}>
      <Route path='userlist' element={<UserList/>}/>
      <Route path='categorylist' element={<CategoryList/>} />
      <Route path='productlist' element={<ProductList/>}/>
      <Route path='allproductslist' element={<AllProducts/>} />
      <Route path='product/update/:id' element={<ProductUpdate/>}/>
      <Route path='orderlist' element={<OrderList/>}/>
      <Route path='dashboard' element={<AdminDashboard/>}/>
      
    </Route>

    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <PayPalScriptProvider>
  <RouterProvider router={router}/>
  </PayPalScriptProvider>

</Provider>
)
// Note-->>

// routes inside routes indicates that there is an outlet that is present in parent route
// example 1 there are routes inside the App Element so there is an outlet present in app component
// example 2 there are routes inside PrivateRoute element so there is an outlet present inside the private element