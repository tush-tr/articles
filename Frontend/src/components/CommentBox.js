import React, { useContext, useReducer, useState } from "react";
import Moment from "react-moment";
import { UserContext } from "../contexts/UserContext";
import api from "../helpers/api";
import { toast } from 'react-toastify';

const CommentBox = ({ articleId, comments }) => {

    const [ newComment, setNewComment ] = useState();
    const [ user, setUser ] = useContext(UserContext);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const submitNewComment = () => {
        if (newComment === undefined|| newComment === "")
            return;

            if (user.isUserLoggedIn) {
                const body = {
                    articleId: articleId,
                    comment: newComment
                }
                api.post("/article/comment", body, { headers: { "auth-token": user.user_token }})
                .then((res) => {
                    const lastComment = res.data.data.lastComment;
                    lastComment.postedBy = {
                        name: user.name,
                        pic: user.pic
                    }
                    comments.push(lastComment);
                    forceUpdate();
                });
            } else {
                toast("Log in to comment")
            }

        // console.log(comments, articleId, user.id);
    }

    return (
        <div className="comment-box">
            <h3>Comments</h3>
            <hr></hr>
            <div className="new-comment">
                <textarea className="comment-textarea form-control" rows="3" onChange={(e) => setNewComment(e.target.value) }></textarea>
                <button className="comment-submit-btn btn btn-primary" onClick={ submitNewComment }>Submit</button>
            </div>
            <hr></hr>  
            {
                // Traverse in reverse order
                comments && comments.slice(0).reverse().map((comment) => {
                    return (
                        <div className="comment" key={comment._id}>
                            <img className="author-pic" src={ comment && comment.postedBy.pic } alt="author pic" />
                            <span className="author-name"><b>{comment.postedBy.name}</b></span>
                            <span className="time"><Moment fromNow>{comment.time}</Moment></span>
                            <p className="comment-text">{comment.comment}</p>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CommentBox
