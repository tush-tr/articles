import React, { useState } from 'react'
import Moment from "react-moment";
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const ArticleListItem = ({article}) => {

    const history = useHistory();
    const location = useLocation();

    const openArticle = () => {
        history.push("/article/" + article._id);
    }

    return (
        <div className="article-list-item">
            <div className="card-body">
                <img className="card-img-top" src="https://picsum.photos/200/200" alt="Random pic" onClick={openArticle} />
                {
                    location.pathname === "/saved-articles" ? <Link to={`/article-edit/${article._id}`}><i className="edit-btn fa fa-edit"></i></Link> : ''
                }
                
                <div className="card-content">
                    <span className="tags">
                        {
                            article.tags.map((tag) => {
                                return <span key={tag} className="tag">{tag}</span>
                            })
                        }
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY">{ article.publishDate }</Moment> </span>
                    <h5 className="card-title" onClick={openArticle}>{article.title}</h5>
                    <img className="author-pic" src={ article && article.author && article.author.pic } alt="author pic" />
                    <span className="card-text"> By {article && article.author && article.author.name}</span>
                </div>
            </div>
        </div>
    )
}

export default ArticleListItem
