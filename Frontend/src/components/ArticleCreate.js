import React from "react";
import EditorJs from "react-editor-js";
import Paragraph from "@editorjs/paragraph"
import Image from "@editorjs/image";

// currently we are using Paragraph and Image tool
// we can add more later
const EDITOR_JS_TOOLS = {
    paragraph: Paragraph,
    image: {
        class: Image,
        config: {
          endpoints: {
            byFile: 'http://localhost:5000/api/imageUpload', // backend file uploader endpoint
          }
        }
      }
    // embed: Embed,
    // table: Table,
    // list: List,
    // warning: Warning,
    // code: Code,
    // linkTool: LinkTool,
    // raw: Raw,
    // header: Header,
    // quote: Quote,
    // marker: Marker,
    // checklist: CheckList,
    // delimiter: Delimiter,
    // inlineCode: InlineCode,
    // simpleImage: SimpleImage
}

// component for creating new article
function ArticleCreate() {
    return (
        <div id="editor">
            <h3>Write a story</h3>
            <EditorJs tools={ EDITOR_JS_TOOLS } />
        </div>
    );
}

export default ArticleCreate;