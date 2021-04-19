import React, { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";

function TitleInput() {

    const [article, setArticle] = useContext(ArticleContext);

    const onChange = (e) => {
        setArticle({
            title: e.target.value,
            text: article.text,
            tags: article.tags
        })
    }

    return (
        <div id="title">
            <input type="text" placeholder="Title..." value={article.title} onChange={onChange} />
        </div>
    );
}

export default TitleInput;