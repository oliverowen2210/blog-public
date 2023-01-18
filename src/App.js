import React, { useState, useEffect } from "react";
import format from "date-fns/format";

import "./App.css";

function App() {
  let [posts, setPosts] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const postsData = await fetch(
        "https://blog-api-production-c97a.up.railway.app/posts"
      );
      const posts = await postsData.json();
      setPosts(posts);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {posts ? (
        posts.map((post) => {
          const formattedDate = format(
            new Date(post.createdAt),
            "MMMM Do, yyyy"
          );
          return (
            <div className="post">
              <div className="post-header">
                <h2>{post.title}</h2>
                <p>posted on {formattedDate}</p>
              </div>
              <p className="post-text">{post.text}</p>
            </div>
          );
        })
      ) : (
        <div>
          <p>There are no posts to display.</p>
        </div>
      )}
    </div>
  );
}

export default App;
