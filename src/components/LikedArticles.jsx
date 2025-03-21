import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LikedArticles() {

    const likedNews = useSelector((store) => store.likedArticles.likedNews);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
      useEffect(() => {
        console.log('Hi');
        if(likedNews.length === 0) {
            navigate('/');
        }
      }, [likedNews]);
    
      return (
        <div className="container mt-4">
          <h2>Notifications</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th style={{ width: '10%'}}>Link</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {likedNews.length > 0 && likedNews.map((article, index) => (
                <tr key={index}>
                  <td>{article.title}</td>
                  <td>{article.description}</td>
                  <td>
                    <a href={article.url} target="_blank" >
                      Read More
                    </a>
                  </td>
                  <td>
                    <button onClick={() => dispatch({ type: 'news/removeLikedNews', payload: {article} })}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default LikedArticles;