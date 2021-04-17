import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from "../helpers/api";
import Moment from "react-moment";
import Output from 'editorjs-react-renderer';

const Article = () => {

    const { id } = useParams();

    const [article, setArticle] = useState("");

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
            <span> Author's name </span> &#183;
            <span> <Moment fromNow>{ article.publishDate }</Moment> </span> &#183;
            <span> { article.readTime } </span>
            <div> <Output data={article.text} /> </div>
        </div>
    )
}

export default Article
