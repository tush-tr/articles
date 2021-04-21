import React from 'react'
import Moment from "react-moment";
import { useHistory } from 'react-router';

const ArticleListItem = ({article}) => {

    const history = useHistory();

    const openArticle = () => {
        history.push("/article/" + article._id);
    }

    return (
        <div className="article-list-item" onClick={openArticle}>
            <div className="card-body">
                <img className="card-img-top" src="https://picsum.photos/200/200" alt="Random pic" />
                <div className="card-content">
                    <span className="tags">
                        {
                            article.tags.map((tag) => {
                                return <span className="tag">{tag}</span>
                            })
                        }
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY">{ article.publishDate }</Moment> </span>
                    <h5 className="card-title">{article.title}</h5>
                    <span className="card-text"> By {article.author.name}</span>
                </div>
            </div>
        </div>
    )
}

export default ArticleListItem
