import React, { useEffect, useState } from "react";
import '../index.css';

const BE_URL = import.meta.env.VITE_BE_URL;

function HomePage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("${BE_URL}/api/news?category=general")
      .then((res) => res.json())
      .then((data) => setNews(data.articles.filter(e => e.urlToImage != null)))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Top Headlines</h2>
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
        ))}
      </div>
    </div>
  );
}

export default HomePage;
