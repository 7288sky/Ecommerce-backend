//Add a product to a localStorage

export const addFavoriteLocalStorage=(product)=>{
    const favorites=getFavouritesFromLocalStorage()
    if(!favorites.some((p)=>p._id===product._id)){
        favorites.push(product)
        localStorage.setItem('favorites',JSON.stringify(favorites));
    }
};



//Remove product from a localStorage


export const removeFavoritesFromLocalStorage=(productId)=>{
    const favorites=getFavouritesFromLocalStorage()

    const updateFavorites=favorites.filter((product)=>product._id!=productId);
    localStorage.setItem('favorites',JSON.stringify(updateFavorites))
}


// Retrieve favourites from a local storage

export const getFavouritesFromLocalStorage=()=>{
    const favoritesJSON=localStorage.getItem('favorites')
    return favoritesJSON ? JSON.parse(favoritesJSON):[]
}