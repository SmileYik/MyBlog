import {marked} from "marked";
import hljs from "highlight.js";
import MathJax from "mathjax3-react";
import React from "react";
import "../common/style/night-owl.min.css"
import "../common/style/markdown-style.css"

export const MarkdownUtil = {
  defaultRenderer: new marked.Renderer(),
  codeCopyIcon: "<svg aria-hidden='true' height='16' viewBox='0 0 16 16' width='16' data-view-component='true' class='code-tool-line-copy'>\n" +
                "    <path fill-rule='evenodd' d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'></path><path fill-rule='evenodd' d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'></path>\n" +
                "</svg>",
  init: function (headCount) {
    const render = new marked.Renderer();
    render.heading = function (text, level) {
      if (headCount) {
        headCount(text, level)
      }
      while (text.indexOf('__') !== -1) {
        text = text.replace('__', ' ')
      }
      let id = text;
      while (id.indexOf(" ") !== -1) id = id.replace(" ", "-");
      return "<h" + level + " id='" + encodeURIComponent(id) + "'>" + text + "</h" + level + ">"
    };

    render.code = (code, infostring, escaped) => {
      let oriCode = this.defaultRenderer.code(code, infostring, escaped)
      oriCode = "<div class='ori-code'>" + oriCode.substring(5, oriCode.length - 7) + "</div>"
      // tool bar
      let toolBar =
        "<div class='code-tool-line'>" +
          "<div onclick='copyCode.copyCode(this)' title='复制'>" +  this.codeCopyIcon +
            "<pre class='code-tool-line-copy-content' hidden>" + code + "</pre>" +
          "</div>" +
        "</div>"
      // 生成行号
      let lineNumber = "<code class='code-line-number' style='background: none'><span line-row>"
      const number = code.split("\n").length
      for (let i = 1; i <= number; ++i) {
        lineNumber += "<span></span>";
      }
      lineNumber += "</span></code>";
      // 将代码与行号及工具栏合并.
      return "<div class='code-pre'><pre>" +
              toolBar + lineNumber + oriCode +
              "</pre></div>\n"
    }
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
        ],
      }} url="https://unpkg.zhimg.com/mathjax@3.2.0/es5/tex-mml-chtml.js">
        <div className="entry-content">
          <MathJax.Html html={ marked(text) } />
        </div>
      </MathJax.Provider>
    );
  },
  renderWithoutMath: function (text) {
    return marked(text)
  }
}
