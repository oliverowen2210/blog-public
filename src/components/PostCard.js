import React from "react";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const PostCard = function (props) {
  return (
    <div className="postCardWrapper">
      <div className="postCard" key={props.post.id}>
        <div className="postCardHeader">
          <h2 className="postCardTitle">
            <Link className="postCardTitleLink" to={`/post/${props.post.id}`}>
              {props.post.title}
            </Link>
          </h2>
        </div>

        <div className="postCardInfo flexRow">
          <p>
            {" "}
            By{" "}
            <a
              href="https://github.com/oliverowen2210"
              className="postCardLink"
            >
              Oliver Owen
            </a>
          </p>
          <p className="postCardDate">
            Posted on {format(new Date(props.post.createdAt), "MMMM Do, yyyy")}
          </p>
          <p className="postCardComments">
            {props.post.commentCount}{" "}
            {props.post.commentCount === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
