import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from "../helpers/api";
import Moment from "react-moment";
import Output from 'editorjs-react-renderer';
import Heart from "react-animated-heart";


const Article = () => {

    const { id } = useParams();

    const [article, setArticle] = useState(false);

    const [isClick, setClick] = useState(false);

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = () => {
        api.get(`/article/${id}`).then((res) => {
            // set state
            setArticle(res.data.data.article[0]);
        })
    };

    return (
        <div className="article">
            <h1> { article.title } </h1>
            <span> { article ? article.author.name : '' } </span> &#183;
            <span> <Moment fromNow>{ article.publishDate }</Moment> </span> &#183;
            <span> { article.readTime } </span>
            <div> <Output data={article.text} /> </div>
            <div className="tags">
                {article.tags && article.tags.map((tag) => {
                    return <span key={tag} className="tag">{tag}</span>;
                })}
            </div>
            <div className="like-btn-layout">
                <Heart isClick={isClick} onClick={() => setClick(!isClick)}  />
                <div className="like-count">20</div>
            </div>
        </div>
    )
}

export default Article
