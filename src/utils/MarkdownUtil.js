import {marked} from "marked";
import hljs from "highlight.js";
import MathJax from "mathjax3-react";
import React from "react";
import "../common/style/night-owl.min.css"

export const MarkdownUtil = {
  init: function () {

  },
  render: function (text) {
    const render = new marked.Renderer();
    render.heading = function (text, level) {
      return "<h" + level + " id='" + encodeURIComponent(text) + "'>" + text + "</h" + level + ">";
    };
    marked.setOptions({
      renderer: render,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "";
        if (language === "") {
          return hljs.highlightAuto(code).value;
        } else {
          return hljs.highlight(code, { language }).value;
        }
      },
      langPrefix: 'hljs language-'
    });
    return (
      <MathJax.Provider input="tex" options={{
        tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
        skipHtmlTags: [
          'script', 'noscript', 'style', 'textarea', 'pre',
          'code', 'annotation', 'annotation-xml'
        ]
      }}>
        <div className="entry-content">
          <MathJax.Html html={ marked(text) } />
        </div>
      </MathJax.Provider>
    );
  }
}