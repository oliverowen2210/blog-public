import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import socket from "../socket";

import PostCard from "./PostCard";

const PostsList = function () {
  let [posts, setPosts] = useState(null);
  let [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("new_post", (post) => {
      setPosts((posts) => {
        let newPosts = [...posts];
        newPosts.unshift(post);
        return newPosts;
      });
    });

    return () => {
      socket.off("new_post");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get posts
  useEffect(() => {
    async function fetchData() {
      const postsData = await fetch(
        `${process.env.REACT_APP_BLOG_API_URL}/posts`
      );
      const posts = await postsData.json();
      setPosts(posts);
    }
    try {
      fetchData();
    } catch (err) {
      setError(err);
    }
  }, [navigate]);

  return (
    <div className="postsListWrapper">
      <div className="postsList">
        {error ? (
          <div>
            <p>error.message</p>
          </div>
        ) : posts ? (
          posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
