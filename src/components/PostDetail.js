import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import format from "date-fns/format";
import parse from "html-react-parser";

import CommentsList from "./CommentsList";
import PostCommentForm from "./PostCommentForm";

const PostDetail = function () {
  let [post, setPost] = useState(null);
  let [comments, setComments] = useState(null);
  let [error, setError] = useState(null);
  let [formattedDate, setFormattedDate] = useState(null);

  const postID = parseInt(useParams().postid);
  const navigate = useNavigate();

  function formatDate(date) {
    return format(new Date(date), "MMMM Qo, yyyy");
  }

  //get post
  useEffect(() => {
    async function fetchData() {
      try {
        const postData = await fetch(
          `${process.env.REACT_APP_BLOG_API_URL}/posts/${postID}`
        );

        if (postData.status === 404) {
          setError("No post with that ID was found.");
          return;
        }
        const post = await postData.json();

        const commentsData = await fetch(
          `${process.env.REACT_APP_BLOG_API_URL}/comments/post/${postID}`
        );
        const comments = await commentsData.json();

        setFormattedDate(formatDate(post.createdAt));
        setPost(post);
        setComments(comments);
      } catch (err) {
        setError(err.message);
        return;
      }
    }
    try {
      fetchData();
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      setError(err);
    }
  }, [navigate, postID]);

  return error ? (
    <div>
      <p>{error}</p>
    </div>
  ) : post ? (
    <div className="postDetailWrapper">
      <div className="postDetail" key={post.id}>
        <div className="postDetailHeader flexRow">
          <h2 className="postDetailTitle">{post.title}</h2>
        </div>
        <div className="postDetailInfo flexRow">
          <p>
            By{" "}
            <a
              href="https://github.com/oliverowen2210"
              className="postDetailLink"
            >
              Oliver Owen
            </a>
          </p>
          <p className="postDetailDate">Posted on {formattedDate}</p>

          <p className="postDetailComments">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>
        <div className="postDetailBody">{parse(post.text)}</div>
      </div>

      <div className="postComments">
        <h2>Comments</h2>
        <PostCommentForm comments={comments} setComments={setComments} />

        {comments ? (
          <CommentsList comments={comments} />
        ) : (
          <div>There are no comments on this post yet. Write one above!</div>
        )}
      </div>
    </div>
  ) : (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default PostDetail;
