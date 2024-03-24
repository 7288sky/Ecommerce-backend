import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './Api/apiSlice'
import authReducer from './featires/auth/authSlice'
import favoriteReducer from '../redux/featires/favourites/favouriteSlice'
import {getFavouritesFromLocalStorage} from '../Utils/locaStorage'
import cartSliceReducer from './featires/cart/cartSlice'
import shopReducer from './featires/shop/shopSlice'

const initialFavorites=getFavouritesFromLocalStorage() || [];

export const store =configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favorites:favoriteReducer,
        cart:cartSliceReducer,
        shop:shopReducer,
    },
    preloadedState:{
        favorites:initialFavorites
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})
setupListeners(store.dispatch)

export default store;