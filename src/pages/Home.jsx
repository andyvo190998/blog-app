import { Alert, Stack } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const { setBackendConnection, backendConnection } = useContext(AuthContext);
  const navigate = useNavigate();
  const cat = useLocation().search;
  const [posts, setPosts] = useState([]);
  const [onLoading, setOnLoading] = useState(null);

  const goToPost = (post) => {
    navigate(`/post/${post.id}`);
  };

  const handleShortenText = (text) => {
    const shortText = text.length > 200 ? text.slice(0, 200) + '...' : text;

    return shortText;
  };

  useEffect(() => {
    setOnLoading(null);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BE_ENDPOINT}/api/posts${cat}`
        );
        setPosts(data);
        setOnLoading(false);
      } catch (error) {
        setBackendConnection(false);
        setOnLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [cat]);
  return (
    <div className="home">
      {onLoading === null ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : onLoading === false && backendConnection === false ? (
        <Stack sx={{ flex: 5, mt: 5 }}>
          <Alert severity="error">Backend connection fail!</Alert>
        </Stack>
      ) : (
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post">
                <div
                  onClick={() => goToPost(post)}
                  className={post.img === null ? 'unknownImg' : 'img'}
                >
                  <img
                    src={`../../dist/uploads/${post.img}`}
                    alt="Post image error"
                  />
                </div>
                <div className="content">
                  <Link className="link" to={`/blog-app/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: handleShortenText(post.description),
                    }}
                  />
                  {/* {handleShortenText(post.description)} */}
                  <button onClick={() => goToPost(post)}>Read More</button>
                </div>
              </div>
            ))
          ) : (
            <Stack sx={{ flex: 5, mt: 5 }}>
              <Alert severity="success">
                Create first post in this category
              </Alert>
            </Stack>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
