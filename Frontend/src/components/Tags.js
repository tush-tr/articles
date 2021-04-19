import React, { useState, useContext } from 'react'
import TagsInput from "react-tagsinput"
import "react-tagsinput/react-tagsinput.css"
import { toast } from "react-toastify";
import { ArticleContext } from "../contexts/ArticleContext";

const Tags = () => {

    const [tags, setTags] = useState([]);

    const [article, setArticle] = useContext(ArticleContext);

    const handleChange = (tags) => {
        if (tags.length > 3) {
            toast.error("Only three tags are allowed");
            return;
        }
        setTags(tags);
        setArticle({
            title: article.title,
            text: article.text,
            tags: tags
        })
    }

    return (
        <div className="tags-container">
            <TagsInput className="tag" value={tags} onChange={handleChange} />
        </div>
    )
}

export default Tags
