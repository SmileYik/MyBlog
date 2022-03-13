import {marked} from "marked";
import hljs from "highlight.js";
import MathJax from "mathjax3-react";
import React from "react";

export const MarkdownUtil = {
  init: function () {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: true,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  },
  render: function (text) {
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