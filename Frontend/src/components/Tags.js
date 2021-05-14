import React, { useState, useContext, useEffect } from 'react'
import TagsInput from "react-tagsinput"
import "react-tagsinput/react-tagsinput.css"
import { toast } from "react-toastify";
import { ArticleContext } from "../contexts/ArticleContext";

const Tags = () => {

    const [article, setArticle] = useContext(ArticleContext);

    const handleChange = (tags) => {
        if (tags.length > 3) {
            toast.error("Only three tags are allowed");
            return;
        }
        setArticle({
            title: article.title,
            text: article.text,
            tags: tags,
            headerImage: article.headerImage
        });
    }

    return (
        <div className="tags-container">
            <TagsInput className="tag" value={article && article.tags} onChange={handleChange} />
        </div>
    )
}

export default Tags
