const initialState = {
    likedNews: [],
    countOfLikedNews: 0,
    currentNews: []
};

const LikedNewsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'news/setCurrentNews': {
            return { 
                ...state,
                currentNews: [...action.payload]
            }
        }
        case 'news/addLikedNews': {
            
            let likedArticle = action.payload.article;
            action.payload = {
                ...action.payload,
                article: {
                    ...action.payload.article,
                    isLiked: true
                }
            }
            const obj =  {
                ...state,
                likedNews: [...state.likedNews, action.payload.article],
                currentNews: [...state.currentNews.map(element => 
                    element.title === likedArticle.title ? {...element, isLiked: true} : element
                )],
                countOfLikedNews: state.countOfLikedNews + 1
            }
            return obj
        }
        case 'news/removeLikedNews': {
            let likedArticle = action.payload.article;
            const filteredNews = [...state.likedNews].filter(news => news.title !== action.payload.article.title)
            action.payload = {
                ...action.payload,
                isLiked: false
            }
            return {
                ...state,
                likedNews: filteredNews,
                currentNews: [...state.currentNews.map(element => 
                    element.title === likedArticle.title ? {...element, isLiked: false} : element
                )],
                countOfLikedNews: state.countOfLikedNews - 1
            }
        }
        default: 
            return state
    }
}

export default LikedNewsReducer;