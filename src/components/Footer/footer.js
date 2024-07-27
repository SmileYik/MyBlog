import React from "react";
import {MarkdownUtil} from "../../utils/MarkdownUtil";
import "./footer.css"

class MusicBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedMusicBox: false
    };
  }

  componentDidMount() {
    setTimeout(function () {
      const s = document.createElement("script");
      s.innerText = "MB_onMusicBoxInit()";
      document.body.appendChild(s);
    }, 1000);
  }

  musicBox() {

    // <div id="music-panel">
    //     <div className="widget-column footer-widget-1">
    //       <section id="custom_html-3" className="widget_text widget widget_custom_html">
    //         <h2 className="widget-title">music</h2>
    //         <div className="textwidget custom-html-widget">
    //           <audio controls="controls" height="100" width="100" id="MB_audio"></audio>
    //           <p style={{textIndent: "5.8em"}}>
    //             <a id="MB_Button_Start">播放</a> &nbsp;&nbsp;&nbsp;
    //             <a id="MB_Button_ChangeMode">循环</a> &nbsp;&nbsp;&nbsp;
    //             <a id="MB_Button_Next">下一首</a></p>
    //         </div>
    //       </section>
    //     </div>
    //     <div className="widget-column footer-widget-2">
    //       <section id="custom_html-4" className="widget_text widget widget_custom_html">
    //         <br/>
    //         <div className="textwidget custom-html-widget">
    //           <h2 className="widget-title" id="MB_musicTitle"> </h2>
    //           <p id="MB_musicLyrics"></p>
    //         </div>
    //       </section>
    //     </div>
    //   </div>

    return (
      <div id={this.state.fixedMusicBox ? "music-panel-fixed" : "music-panel"}>
        <div className="warp" style={{width: "1000px", padding: "0 2em", margin: "0 auto"}}>
        <div className="widget-column footer-widget-1">
          <section id="custom_html-3" className="widget_text widget widget_custom_html">
            <h2 className="widget-title">
              <input type="checkbox" onClick={() => {
                this.setState((state) => {
                  return {
                    fixedMusicBox: !state.fixedMusicBox
                  }
                })
              }}/>
              music
            </h2>
            <div className="textwidget custom-html-widget">
              <audio controls="controls" height="100" width="100" id="MB_audio"></audio>
              <p style={{textIndent: "5.8em"}}>
                <a id="MB_Button_Start">播放</a> &nbsp;&nbsp;&nbsp;
                <a id="MB_Button_ChangeMode">循环</a> &nbsp;&nbsp;&nbsp;
                <a id="MB_Button_Next">下一首</a></p>
            </div>
          </section>
        </div>
        <div className="widget-column footer-widget-2">
          <section id="custom_html-4" className="widget_text widget widget_custom_html">
            <br/>
            <div className="textwidget custom-html-widget">
              <h2 className="widget-title" id="MB_musicTitle"> </h2>
              <p id="MB_musicLyrics"></p>
            </div>
          </section>
        </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <aside className="widget-area" role="complementary" aria-label="页脚">
      {this.musicBox()}
      </aside>
    );
  }
}


class FooterComponent extends React.Component {
  weight;
  constructor(props) {
    super(props);
    this.weight = props.weight;
  }

  render() {
    return (
      <div className="widget-column footer-widget-1">
        <section className="widget_text widget widget_custom_html">
          <h2 className="widget-title">
            {this.weight.title}
          </h2>
          <div className="textwidget custom-html-widget">
            {MarkdownUtil.render(this.weight.content)}
          </div>
        </section>
      </div>
    );
  }
}

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer id="colophon" className="site-footer" role="contentinfo">
        <div className="wrap">
          <MusicBox />
        </div>
      </footer>
    );
  }
}
