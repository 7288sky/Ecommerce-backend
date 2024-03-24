import {FaHeart ,FaRegHeart} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import {
    addToFavourites,
    removeFromFavourites,
    setFavorites,
} from '../../redux/featires/favourites/favouriteSlice'

import {addFavoriteLocalStorage,getFavouritesFromLocalStorage,removeFavoritesFromLocalStorage} from '../../Utils/locaStorage'
import { useEffect } from 'react'





function HeartIcon({product}) {

const dispatch=useDispatch()
const favorites=useSelector(state=>state.favorites||[])

const isFavorite=favorites.some((p)=>p._id===product?._id)


useEffect(()=>{
    const favoritesFromLocalStorage=getFavouritesFromLocalStorage()

    dispatch(setFavorites(favoritesFromLocalStorage))
},[])

const toggleFavorites=()=>{
    if(isFavorite){
        dispatch(removeFromFavourites(product))
        //remove the prouct from localStorage as well
        removeFavoritesFromLocalStorage(product?._id)
    }else{
        dispatch(addToFavourites(product))
        //add the product to the localStorage as well
        addFavoriteLocalStorage(product)

    }
}


  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  )
}

export default HeartIcon