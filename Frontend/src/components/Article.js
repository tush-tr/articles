import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from "../helpers/api";
import Moment from "react-moment";
import Output from 'editorjs-react-renderer';
import Heart from "react-animated-heart";
import {UserContext} from "../contexts/UserContext";
import { toast } from 'react-toastify';
import CommentBox from "./CommentBox"

const Article = () => {

    const { id } = useParams();

    const [article, setArticle] = useState(false);

    var [isLiked, setIsLiked] = useState(false);

    var [likesCount, setLikesCount] = useState(0);

    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = async () => {
        api.get(`/article/${id}`)
        .then((res) => {
            const articleFromResponse = res.data.data.article[0];
            console.log(articleFromResponse);
            setArticle(articleFromResponse);
            setLikesCount(articleFromResponse.likes.length);
            if (articleFromResponse.likes && articleFromResponse.likes.includes(user.id)) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        })
    };

    const likeArticle = () => {

        if (user.isUserLoggedIn) {
            const body = {
                articleId: article._id
            }
            api.post("/article/like-unlike", body, { headers: { "auth-token": user.user_token }})
            .then((res) => {
                setIsLiked(!isLiked);
                setLikesCount(res.data.data.likes.length);
            });
        } else {
            toast("Log in to like the article.")
        }

    }

    return (
        <div className="article">
            <h1> { article.title } </h1>
            <span> By { article ? article.author.name : '' } </span> &#183;
            <span> <Moment fromNow>{ article.publishDate }</Moment> </span> &#183;
            <span> { article.readTime } </span>
            <div> <Output data={article.text} /> </div>
            <div className="tags">
                {article.tags && article.tags.map((tag) => {
                    return <span key={tag} className="tag">{tag}</span>;
                })}
            </div>
            <div className="like-btn-layout">
                <Heart isClick={isLiked} onClick={likeArticle}  />
                <span className="like-count">{ likesCount } { likesCount !== 1 ? "Likes" : "Like" }</span>
            </div>
            <CommentBox comments={article.comments} articleId={article._id} />
        </div>
    )
}

export default Article
