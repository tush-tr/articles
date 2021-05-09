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

    const [article, setArticle] = useState('');

    var [isLiked, setIsLiked] = useState(false);

    var [likesCount, setLikesCount] = useState(0);

    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = async () => {
        api.get(`/article/${id}`, { headers: { "auth-token": user.user_token }})
        .then((res) => {
            const articleFromResponse = res.data.data && res.data.data;
            if (articleFromResponse) {
                console.log(articleFromResponse);
                setArticle(articleFromResponse);
                setLikesCount(articleFromResponse.likes.length);
                if (articleFromResponse.likes && articleFromResponse.likes.includes(user.id)) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
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

    const bookmarkArticle = () => {

        if (user.isUserLoggedIn) {
            const body = {
                articleId: article._id
            }
            api.post("/article/bookmark", body, { headers: { "auth-token": user.user_token }})
            .then((res) => {
                setArticle({
                    ...article,
                    isBookmarked: true
                })
            });
        } else {
            toast("Log in to bookmark the article.")
        }

    }



    return (
        <div className="article">
            <h1> { article && article.title } </h1>
            <img class="author-pic" src={ article && article.author.pic } alt="author pic" />
            <span class="author-name"> <b> By { article && article.author && article.author.name } </b> </span> &#183;
            <span> <Moment fromNow>{ article && article.publishDate }</Moment> </span> &#183;
            <span> { article && article.readTime } </span>
            <span className="bookmark-icon"> 
                {
                    article.isBookmarked ? 
                    <i className="fas fa-bookmark"></i> 
                    :
                    <i onClick={bookmarkArticle} className="far fa-bookmark"></i> 
                }
            </span>
            <div> <Output data={ article && article.text} /> </div>
            <div className="tags">
                {article && article.tags && article.tags.map((tag) => {
                    return <span key={tag} className="tag">{tag}</span>;
                })}
            </div>
            <div className="like-btn-layout">
                <Heart isClick={isLiked} onClick={likeArticle}  />
                <span className="like-count">{ likesCount } { likesCount !== 1 ? "Likes" : "Like" }</span>
            </div>
            <CommentBox comments={article && article.comments} articleId={article && article._id} />
        </div>
    )
}

export default Article
