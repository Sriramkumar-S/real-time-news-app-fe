import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../index.css';

const BE_URL = import.meta.env.VITE_BE_URL;

function HomePage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSignedInUser, setIsSignedInUser] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isLoggedInUser = localStorage.getItem('userEmail');
  const isSubscribedUser = localStorage.getItem('isSubscribedUser');

  const handleUnsubscribe = () => {
    const isUnsubscribe = confirm(`Are you sure you want to unsubscribe`);
    const subscribedUser = localStorage.getItem('isSubscribedUser');
    console.log(isUnsubscribe);
    if(isUnsubscribe) {
      fetch(`${BE_URL}/api/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscribedUser }),
      })
        .then((res) => {
          if (res.ok) {
            console.log(res)
            // localStorage.setItem('isSubscribedUser', email);
            localStorage.removeItem('isSubscribedUser');
            // navigate("/");
            setIsSubscribed(false);
          } else {
            console.error("Subscription failed");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleSignout = () => {
    console.log(isSignedInUser);
    const loggedInUser = localStorage.getItem('userEmail');
    if(isSignedInUser) {
      fetch(`${BE_URL}/api/signout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loggedInUser }),
      })
        .then((res) => {
          if (res.ok) {
            console.log(res)
            localStorage.removeItem('userEmail');
            setIsSignedInUser(false);
          } else {
            console.error("Signout failed");
          }
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    if (isLoggedInUser) {
      setIsSignedInUser(true);
    }
    if(isSubscribedUser) {
      setIsSubscribed(true);
    }
    
    // if(isSubscribed) {
    //   setIsSubscribed(true);
    // }else {
    //   setIsSubscribed(false);
    // }
    fetch(`${BE_URL}/api/news?category=general`)
      .then((res) => res.json())
      .then((data) => {setNews(data.articles.filter(e => e.urlToImage != null));
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [isSignedInUser, isSubscribed]);

  return (
    (!loading) ? (<div className="container mt-4">
      <div style={{ display: 'flex'}}>
        <h2 style={{ width: '100%'}}>Top Headlines</h2>
        <div style={{ width: '100%'}}>
          {!isSignedInUser && <Link to="/signup" className="btn btn-primary me-2" style={{ float: 'right'}}>
            Sign Up
          </Link>}
          {isSignedInUser && <button onClick={handleSignout} className="btn btn-primary me-2" style={{ float: 'right'}}>
            Sign out
          </button>}
          {isSignedInUser && !isSubscribed && <Link to="/subscribe" className="btn btn-primary me-2" style={{ float: 'right'}}>
              Subscribe
            </Link>}
          {isSignedInUser && isSubscribed && <button onClick={handleUnsubscribe} className="btn btn-primary me-2" style={{ float: 'right'}}>
            Unsubscribe
          </button>}
        </div>
      </div>
      <div className="row">
        {news.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card" style={{ height: "35rem" }}>
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
        ) )}
      </div>
    </div>): (
          <h1 style={{ position: 'absolute', width: '100%', height: '100%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}><i className="fa-solid fa-spinner fa-spin"></i></h1>
        )
  );
}

export default HomePage;
