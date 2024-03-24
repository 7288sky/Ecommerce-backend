import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice=createSlice({
    name:'favorites',
    initialState:[],
    reducers:{
        addToFavourites:(state,action)=>{
            // checkIf the product is not already favourites
            if(!state.some(product=>product._id===action.payload._id)){
                state.push(action.payload)
            }
        },
        removeFromFavourites:(state,action)=>{
            //Remove the product with same id
            return state.filter((product)=>product._id!=action.payload._id);
        },
        setFavorites:(state,action)=>{
            //set the favorites from local Storage
            return action.payload
        },
    },
});


export const {addToFavourites,removeFromFavourites,setFavorites}=favoriteSlice.actions;
export const selectFavoriteProduct=(state)=>state.favorites
export default favoriteSlice.reducer;