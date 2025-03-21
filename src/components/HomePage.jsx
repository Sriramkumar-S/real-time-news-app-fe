import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import '../index.css';
import PaginatedItems from "./Pagination";
import { useDispatch, useSelector, connect } from "react-redux";

const BE_URL = import.meta.env.VITE_BE_URL;

function HomePage_1({currentItemsNews, likedNewsItems}) {
    const [news, setNews] = useState([]);
    const currentNews = useRef([]);
    const [loading, setLoading] = useState(true);

    const initialUserStatus = {
        isSignedInUser: false,
        isSubscribed: false
    }
    const [userStatus, setUserStatus] = useState(initialUserStatus)

    const isLoggedInUser = localStorage.getItem('userEmail');
    const isSubscribedUser = localStorage.getItem('isSubscribedUser');
    const itemsPerPage = 6;

    const dispatch = useDispatch();

    const likedNews = useSelector((store) => store.likedArticles.likedNews);

    const handleUnsubscribe = () => {
        const isUnsubscribe = confirm(`Are you sure you want to unsubscribe`);
        const subscribedUser = localStorage.getItem('isSubscribedUser');
        if (isUnsubscribe) {
            fetch(`${BE_URL}/api/unsubscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subscribedUser }),
            })
                .then((res) => {
                    if (res.ok) {
                        localStorage.removeItem('isSubscribedUser');
                        setUserStatus({
                            ...userStatus,
                            isSubscribed: false
                        })
                    } else {
                        console.error("Subscription failed");
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    const handleSignout = () => {
        const loggedInUser = localStorage.getItem('userEmail');
        if (userStatus.isSignedInUser) {
            fetch(`${BE_URL}/api/signout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ loggedInUser }),
            })
                .then((res) => {
                    if (res.ok) {
                        localStorage.removeItem('userEmail');
                        setUserStatus({
                            ...userStatus,
                            isSignedInUser: false
                        })
                        alert('User Signed out successfully');
                    } else {
                        console.error("Signout failed");
                        alert("Signout failed");
                    }
                })
                .catch((error) => console.error(error));
        }
    }

    function handleNewsToDisplay(currentNewsItems) {
        likedNewsItems.forEach((el) => {
            currentNewsItems.forEach((element, index, self) => {
                if(el.title === element.title) {
                    self.splice(index, 1, el)
                }
            });
        });
        dispatch({ type: 'news/setCurrentNews', payload: currentNewsItems});
    }

    function getNewsItems(category) {
        fetch(`${BE_URL}/api/news?category=${category}`)
            .then((res) => res.json())
            .then((data) => {
                const newsItems = data.articles.filter(e => e.urlToImage != null);
                newsItems.forEach(element => {
                    element.isLiked = false;
                    if (Boolean(likedNews.find(el => el.title === element.title))) {
                        element.isLiked = true;
                    }
                });
                currentNews.current = newsItems.slice(0, itemsPerPage);
                dispatch({ type: 'news/setCurrentNews', payload: currentNews.current});
                setNews(newsItems);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }

    const handleLikedArticle = (article) => {
        if (!article.isLiked) {
            dispatch({ type: 'news/addLikedNews', payload: {article} });
        } else {
            dispatch({ type: 'news/removeLikedNews', payload: {article} });
        }
    }

    useEffect(() => {
        if (isSubscribedUser) {
            setUserStatus({
                ...userStatus,
                isSignedInUser: true,
                isSubscribed: true
            })
        }else if (isLoggedInUser) {
            setUserStatus({
                ...userStatus,
                isSignedInUser: true
            })
        }
        getNewsItems('general');
    }, [isLoggedInUser, isSubscribedUser]);


    return (
        (!loading) ? (<div className="container mt-4">
            <div style={{ display: 'flex' }}>
                <h2 style={{ width: '100%' }}>Top Headlines</h2>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="category">Category:
                    </label>{' '}
                    <select className="form-select" name="category" id="category"
                        onChange={(event) => getNewsItems(event.target.value)}>
                        <option value="general">General</option>
                        <option value="business">Business</option>
                        <option value="sports">Sports</option>
                        <option value="technology">Technology</option>
                    </select>

                </div>
                <div style={{ width: '100%' }}>
                    {!userStatus.isSignedInUser && <Link to="/signup" className="btn btn-primary me-2" style={{ float: 'right' }}>
                        Sign Up
                    </Link>}
                    {userStatus.isSignedInUser && <Link to="/likedArticles" className="btn btn-primary me-2" style={{ float: 'right' }}>
                        Liked Articles
                    </Link>}
                    {userStatus.isSignedInUser && <button onClick={handleSignout} className="btn btn-primary me-2" style={{ float: 'right' }}>
                        Sign out
                    </button>}
                    {userStatus.isSignedInUser && !userStatus.isSubscribed && <Link to="/subscribe" className="btn btn-primary me-2" style={{ float: 'right' }}>
                        Subscribe
                    </Link>}
                    {userStatus.isSignedInUser && userStatus.isSubscribed && <button onClick={handleUnsubscribe} className="btn btn-primary me-2" style={{ float: 'right' }}>
                        Unsubscribe
                    </button>}
                </div>
            </div>
            <div className="row">
                {currentItemsNews.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card" style={{ height: "35rem" }}>
                            <span style={{ position: 'absolute', bottom: '4%', right: '40%' }} onClick={() => handleLikedArticle(article)}>
                                {userStatus.isSignedInUser && article.isLiked && <i className="fa-solid fa-heart fa-lg" style={{ color: '#f00f1b' }}></i>}
                                {userStatus.isSignedInUser && !article.isLiked && <i className="fa-regular fa-heart fa-lg" style={{ color: '#f00f1b' }}></i>}
                            </span>
                            <img
                                src={article.urlToImage}
                                className="card-img-top news-image"
                                alt={article.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.description}</p>
                                <p style={{ position: 'absolute', bottom: 0, right: '12px' }}>
                                    <a
                                        href={article.url}
                                        className="btn btn-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read More
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row">
                <PaginatedItems itemsPerPage={itemsPerPage} items={news} handleNewsToDisplay={handleNewsToDisplay} />
            </div>
        </div>) : (
            <h1 style={{
                position: 'absolute', width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}><i className="fa-solid fa-spinner fa-spin"></i></h1>
        )
    );
}

const mapStateToProps = (state) => {
    return {
        currentItemsNews: state.likedArticles.currentNews,
        likedNewsItems: state.likedArticles.likedNews
    }
}


export default connect(mapStateToProps)(HomePage_1);
