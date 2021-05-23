import React, { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import { UserContext } from "../contexts/UserContext";
import api from "../helpers/api";

const ArticleHeaderImage = () => {

  const [user, setUser] = useContext(UserContext);
  const [article, setArticle] = useContext(ArticleContext);

  const uploadHeaderImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await api.post("/article-header-image-upload", formData, {
      headers: { "auth-token": user.user_token },
    })
      .then((res) => {
        console.log(res.data);
        setArticle({
          title: article.title,
          text: article.text,
          tags: article.tags,
          headerImage: res.data.file.url
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="article-header-wrapper">
      <label
        htmlFor="photo-upload"
        className="custom-article-header-file-upload fas"
      >
        <div className="article-header-img-wrap img-upload">
          <img
            className="article-header-image"
            htmlFor="photo-upload"
            src={article.headerImage}
            alt="profile"
          />
        </div>
        <input
          id="photo-upload"
          type="file"
          onChange={(e) => uploadHeaderImage(e)}
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default ArticleHeaderImage;
