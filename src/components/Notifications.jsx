import React, { useEffect, useState } from "react";

const BE_URL = import.meta.env.VITE_BE_URL;
function Notifications() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${BE_URL}/api/news?category=general`)
      .then((res) => res.json())
      .then((data) => setNews(data.articles))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Notifications</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th style={{ width: '10%'}}>Link</th>
          </tr>
        </thead>
        <tbody>
          {news.map((article, index) => (
            <tr key={index}>
              <td>{article.title}</td>
              <td>{article.description}</td>
              <td>
                <a href={article.url} target="_blank" >
                  Read More
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notifications;
