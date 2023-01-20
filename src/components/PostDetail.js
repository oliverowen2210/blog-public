import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import format from "date-fns/format";
import parse from "html-react-parser";

import CommentsList from "./CommentsList";

const PostDetail = function () {
  let [post, setPost] = useState(null);
  let [comments, setComments] = useState(null);
  let [error, setError] = useState(null);
  let [formattedDate, setFormattedDate] = useState(null);

  let [commentUsername, setCommentUsername] = useState(null);
  let [commentText, setCommentText] = useState(null);

  const postID = parseInt(useParams().postid);
  const navigate = useNavigate();

  function formatDate(post) {
    setFormattedDate(format(new Date(post.createdAt), "MMMM Qo, yyyy"));
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
        const comments = commentsData.json();
        formatDate(post);
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

  async function submitCommentButtonHandler(event) {
    event.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BLOG_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: commentUsername,
          text: commentText,
          postid: postID,
        }),
      });

      let newComments = [...comments];
      newComments.unshift({
        username: commentUsername,
        text: commentText,
        createdAt: new Date(),
        postid: postID,
      });
      setComments(newComments);
      event.target.reset();
    } catch (err) {
      console.log(err);
    }
  }

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

        <form className="userComment">
          <div className="postFormInputGroup userCommentText">
            <label htmlFor="comment">Leave a comment</label>
            <textarea
              name="comment"
              onChange={(event) => setCommentText(event.target.value)}
            ></textarea>
          </div>
          <div className="userCommentFooter">
            <div className="postFormInputGroup userCommentUsername">
              <label htmlFor="username">Username (optional)</label>
              <input
                name="username"
                placeholder="Anonymous"
                onChange={(event) => setCommentUsername(event.target.value)}
              ></input>
            </div>
            <button
              className="userCommentSubmitButton"
              onClick={submitCommentButtonHandler}
            >
              Submit
            </button>
          </div>
        </form>

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
