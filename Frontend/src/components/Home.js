import React, { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import api from "../helpers/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Moment from "react-moment";
import { useHistory } from 'react-router';

function Home() {

    const history = useHistory();

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  const [recentArticles, setRecentArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);

  useEffect(() => {
    getTrendingArticles();
    getRecentArticles();
  }, []);

  const getRecentArticles = async () => {
    const res = await api.get(`/article/recent`);
    if (res.data.status === 1 && res.data.data)
      setRecentArticles(res.data.data.articles);
  };

  const getTrendingArticles = async () => {
    const res = await api.get(`/article/trending`);
    if (res.data.status === 1 && res.data.data)
      setTrendingArticles(res.data.data.articles);
  };

  const openArticle = (articleId) => {
    history.push("/article/" + articleId);
}

  return (
    <div>
      <h2 className="carousel-title">Trending</h2>
      <Slider {...settings}>
        {trendingArticles.map((article) => (
          <div key={article._id} onClick={() => openArticle(article._id)}>
            <div className="row carousel-slide">
              <div className="col-md-5 image-wrapper">
                <img src={article.headerImage} alt="dlide" />
              </div>
              <div className="col-md-7 content-wrapper">
                <span className="tags">
                  {article.tags.map((tag) => {
                    return (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    );
                  })}
                </span>
                <span className="date">
                  {" "}
                  - <Moment format="MMM DD, YYYY">
                    {article.publishDate}
                  </Moment>{" "}
                </span>
                <h1 className="title">{article.title}</h1>
                <img
                  className="author-pic"
                  src={article && article.author && article.author.pic}
                  alt="author pic"
                />
                <span className="author-name">
                  {" "}
                  By {article && article.author && article.author.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <h2 className="recent-articles"><b>Recent Articles</b></h2>
      <ArticleList articles={recentArticles} />
    </div>
  );
}

export default Home;
