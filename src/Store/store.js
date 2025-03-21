import { configureStore } from "@reduxjs/toolkit";
import LikedNewsReducer  from './LikedNewsReducer.js'

export default configureStore({
    reducer: {
        likedArticles: LikedNewsReducer
    }
})