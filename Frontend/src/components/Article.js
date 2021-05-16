import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import api from "../helpers/api";
import Moment from "react-moment";
import Output from "editorjs-react-renderer";
import Heart from "react-animated-heart";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import CommentBox from "./CommentBox";
import Modal from "react-modal";

const Article = () => {
  const { id } = useParams();

  const [article, setArticle] = useState("");
  var [isLiked, setIsLiked] = useState(false);
  var [likesCount, setLikesCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  const [user] = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    api
      .get(`/article/${id}`, { headers: { "auth-token": user.user_token } })
      .then((res) => {
        const articleFromResponse = res.data && res.data.data;
        if (articleFromResponse) {
          setArticle(articleFromResponse);
          setLikesCount(articleFromResponse.likes.length);
          if (
            articleFromResponse.likes &&
            articleFromResponse.likes.includes(user.id)
          ) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
      });
  };

  const likeArticle = () => {
    if (user.isUserLoggedIn) {
      const body = {
        articleId: article._id,
      };
      api
        .post("/article/like-unlike", body, {
          headers: { "auth-token": user.user_token },
        })
        .then((res) => {
          setIsLiked(!isLiked);
          setLikesCount(res.data.data.likes.length);
        });
    } else {
      toast("Log in to like the article.");
    }
  };

  const bookmarkArticle = () => {
    if (user.isUserLoggedIn) {
      const body = {
        articleId: article._id,
      };
      api
        .post("/article/bookmark", body, {
          headers: { "auth-token": user.user_token },
        })
        .then((res) => {
          if (res.data.message === "Bookmarked") {
            setArticle({
              ...article,
              isBookmarked: true,
            });
          } else {
            setArticle({
              ...article,
              isBookmarked: false,
            });
          }
        });
    } else {
      toast("Log in to bookmark the article.");
    }
  };

  const openProfile = (authorId) => {
    history.push(`/profile/${authorId}`);
  };

  // modal code functions
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {}

  // radio button function
  const handleChange = (e) => {
    const { value } = e.target;
    setReportMessage(value);
  };

  // it save report to server
  const reportArticle = () => {
    if (user.isUserLoggedIn) {
      const body = {
        articleId: article._id,
        message: reportMessage,
      };
      api
        .post("/article/report", body, {
          headers: { "auth-token": user.user_token },
        })
        .then((res) => {
          setIsModalOpen(false);
          toast(res.data.message);
        })
        .catch((err) => {
          setIsModalOpen(false);
          toast(err);
        });
    } else {
      toast("Log in to report the article.");
    }
  };

  return (
    <div className="article">
      <h1> {article && article.title} </h1>
      <img
        onClick={() => openProfile(article.author._id)}
        className="author-pic"
        src={article && article.author.pic}
        alt="author pic"
      />
      <span onClick={() => openProfile(article.author._id)} className="author-name">
        {" "}
        <b> By {article && article.author && article.author.name} </b>{" "}
      </span>{" "}
      &#183;
      <span>
        {" "}
        <Moment fromNow>{article && article.publishDate}</Moment>{" "}
      </span>{" "}
      &#183;
      <span> {article && article.readTime} </span>
      <span className="bookmark-icon" onClick={() => setIsModalOpen(true)}>
        <i className="far fa-flag"></i>
      </span>
      <span onClick={bookmarkArticle} className="bookmark-icon">
        {article.isBookmarked ? (
          <i className="fas fa-bookmark"></i>
        ) : (
          <i className="far fa-bookmark"></i>
        )}
      </span>
      <div className="article-header-wrapper-read">
        {" "}
        <img
          className="article-header-image"
          src={article.headerImage}
          alt="article header"
        />
      </div>
      <div>
        {" "}
        <Output data={article && article.text} />{" "}
      </div>
      <div className="tags">
        {article &&
          article.tags &&
          article.tags.map((tag) => {
            return (
              <span key={tag} className="tag">
                {tag}
              </span>
            );
          })}
      </div>
      <div className="like-btn-layout">
        <Heart isClick={isLiked} onClick={likeArticle} />
        <span className="like-count">
          {likesCount} {likesCount !== 1 ? "Likes" : "Like"}
        </span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <h5>
          <b>Why are you reporting this article?</b>
        </h5>
        <div className="radio-buttons">
          <input
            id="radio-1"
            value="I find it offensive"
            name="reportMessage"
            type="radio"
            onChange={handleChange}
          />
          &nbsp; <label htmlFor="radio-1">I find it offensive</label>
          <br />
          <input
            id="radio-2"
            value="It's spam"
            name="reportMessage"
            type="radio"
            onChange={handleChange}
          />
          &nbsp; <label htmlFor="radio-2">It's spam</label>
          <br />
          <input
            id="radio-3"
            value="It's sexually inappropriate"
            name="reportMessage"
            type="radio"
            onChange={handleChange}
          />
          &nbsp; <label htmlFor="radio-3">It's sexually inappropriate</label>
          <br />
          <input
            id="radio-4"
            value="It's scam or misleading"
            name="reportMessage"
            type="radio"
            onChange={handleChange}
          />
          &nbsp; <label htmlFor="radio-4">It's scam or misleading</label>
          <br />
          <input
            id="radio-5"
            value="It's violent or prohibited content"
            name="reportMessage"
            type="radio"
            onChange={handleChange}
          />
          &nbsp; <label htmlFor="radio-5">It's violent or prohibited content</label>
          <br />
          <input
            id="radio-6"
            value="It refers to a political candidate or issue"
            name="reportMessage"
            type="radio"
            onChange={handleChange}
          />
          &nbsp;{" "}
          <label htmlFor="radio-6">
            It refers to a political candidate or issue
          </label>
          <br />
          <input
            id="radio-7"
            value="It violates my intellectual property rights"
            name="reportMessage"
            type="radio"
            onChange={handleChange}
          />
          &nbsp;{" "}
          <label htmlFor="radio-7">
            It violates my intellectual property rights
          </label>
          <br />
        </div>
        <br />
        <button className="btn btn-light float-right" onClick={reportArticle}>
          Submit
        </button>
        <button className="btn btn-light" onClick={() => setIsModalOpen(false)}>
          Back
        </button>
      </Modal>
      <CommentBox
        comments={article && article.comments}
        articleId={article && article._id}
      />
    </div>
  );
};

export default Article;
