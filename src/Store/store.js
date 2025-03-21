import { configureStore } from "@reduxjs/toolkit";
// import likedNewsReducer from './LikedNewsSlice.js'
import LikedNewsReducer  from './LikedNewsReducer.js'

export default configureStore({
    reducer: {
        likedArticles: LikedNewsReducer
    }
})