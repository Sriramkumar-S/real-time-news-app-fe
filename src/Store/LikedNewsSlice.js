import { createSlice } from "@reduxjs/toolkit";

export const likedNewsSlice = createSlice({
    name: "likedArticles",
    initialState: {
        likedNews: [],
        countOfLikedNews: 0
    },
    reducers: {
        addLikedNews(state, action) {
            // state.likedNews.push(action.payload);
            state.likedNews = [...state.likedNews, action.payload];
            state.countOfLikedNews++;
        },
        removeLikedNews(state, action) {
            state.likedNews = state.likedNews.filter(news => news.title!== action.payload.title);
            state.countOfLikedNews--;
        }
    }
});

export const { addLikedNews, removeLikedNews } = likedNewsSlice.actions;

export const likedNewsArticles = (store) => store.likedArticles.likedNews;

export default likedNewsSlice.reducer;