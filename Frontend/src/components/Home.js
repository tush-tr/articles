import React, { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import api from "../helpers/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Moment from "react-moment";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [articles, setArticles] = useState();

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const res = await api.get(`/article/recent`);
    if (res.data.status === 1 && res.data.data)
      setArticles(res.data.data.articles);
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
            <div className="row carousel-slide">
                <div className="col-md-5 image-wrapper">
                    <img src="https://picsum.photos/600/500" alt="d" />
                </div>
                <div className="col-md-7 content-wrapper">
                    <span className="tags">
                        <span className="tag">Tag1</span>
                        <span className="tag">Tag2</span>
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY"> May 10, 2021 </Moment> </span>
                    <h1 className="title">Your most unhappy customers are your greatest source of learning.</h1>
                    <img className="author-pic" src="http://localhost:5000/uploads/images/profile/default.png" alt="author pic" />
                    <span className="author-name"> By Arish Rehman Khan</span>
                </div>
            </div>
        </div>
        <div>
            <div className="row carousel-slide">
                <div className="col-md-5 image-wrapper">
                    <img src="https://picsum.photos/600/500" alt="d" />
                </div>
                <div className="col-md-7 content-wrapper">
                    <span className="tags">
                        <span className="tag">Tag1</span>
                        <span className="tag">Tag2</span>
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY"> May 10, 2021 </Moment> </span>
                    <h1 className="title">Your most unhappy customers are your greatest source of learning.</h1>
                    <img className="author-pic" src="http://localhost:5000/uploads/images/profile/default.png" alt="author pic" />
                    <span className="author-name"> By Arish Rehman Khan</span>
                </div>
            </div>
        </div>
        <div>
            <div className="row carousel-slide">
                <div className="col-md-5 image-wrapper">
                    <img src="https://picsum.photos/600/500" alt="d" />
                </div>
                <div className="col-md-7 content-wrapper">
                    <span className="tags">
                        <span className="tag">Tag1</span>
                        <span className="tag">Tag2</span>
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY"> May 10, 2021 </Moment> </span>
                    <h1 className="title">Your most unhappy customers are your greatest source of learning.</h1>
                    <img className="author-pic" src="http://localhost:5000/uploads/images/profile/default.png" alt="author pic" />
                    <span className="author-name"> By Arish Rehman Khan</span>
                </div>
            </div>
        </div>
        <div>
            <div className="row carousel-slide">
                <div className="col-md-5 image-wrapper">
                    <img src="https://picsum.photos/600/500" alt="d" />
                </div>
                <div className="col-md-7 content-wrapper">
                    <span className="tags">
                        <span className="tag">Tag1</span>
                        <span className="tag">Tag2</span>
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY"> May 10, 2021 </Moment> </span>
                    <h1 className="title">Your most unhappy customers are your greatest source of learning.</h1>
                    <img className="author-pic" src="http://localhost:5000/uploads/images/profile/default.png" alt="author pic" />
                    <span className="author-name"> By Arish Rehman Khan</span>
                </div>
            </div>
        </div>
        <div>
            <div className="row carousel-slide">
                <div className="col-md-5 image-wrapper">
                    <img src="https://picsum.photos/600/500" alt="d" />
                </div>
                <div className="col-md-7 content-wrapper">
                    <span className="tags">
                        <span className="tag">Tag1</span>
                        <span className="tag">Tag2</span>
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY"> May 10, 2021 </Moment> </span>
                    <h1 className="title">Your most unhappy customers are your greatest source of learning.</h1>
                    <img className="author-pic" src="http://localhost:5000/uploads/images/profile/default.png" alt="author pic" />
                    <span className="author-name"> By Arish Rehman Khan</span>
                </div>
            </div>
        </div>
        <div>
            <div className="row carousel-slide">
                <div className="col-md-5 image-wrapper">
                    <img src="https://picsum.photos/600/500" alt="d" />
                </div>
                <div className="col-md-7 content-wrapper">
                    <span className="tags">
                        <span className="tag">Tag1</span>
                        <span className="tag">Tag2</span>
                    </span>
                    <span className="date"> - <Moment format="MMM DD, YYYY"> May 10, 2021 </Moment> </span>
                    <h1 className="title">Your most unhappy customers are your greatest source of learning.</h1>
                    <img className="author-pic" src="http://localhost:5000/uploads/images/profile/default.png" alt="author pic" />
                    <span className="author-name"> By Arish Rehman Khan</span>
                </div>
            </div>
        </div>
      </Slider>
      <h2 className="recent-articles">Recent Articles</h2>
      <ArticleList articles={articles} />
    </div>
  );
}

export default Home;
