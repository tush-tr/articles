import React from "react";
import TitleInput from "./TitleInput"
import ArticleButtons from "./ArticleButtons";
import Editor from "./Editor";
import { ArticleProvider } from "../contexts/ArticleContext";

// component for creating new article
function ArticleCreate() {
  return (
    <ArticleProvider>
      <div id="editor">
        <ArticleButtons />
        <TitleInput />
        <Editor />
      </div>
    </ArticleProvider>
  );
}

export default ArticleCreate;