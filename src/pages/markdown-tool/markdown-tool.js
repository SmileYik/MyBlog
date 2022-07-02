import React from "react";
import MyHeader from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import {menuItems, site} from "../../utils/siteInfo";
import LoadAllJs from "../../utils/JsLoader";
import {MarkdownUtil} from "../../utils/MarkdownUtil";

export default class MarkdownPrev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "a": ""
    };
    this.onEditAreaValueChange = this.onEditAreaValueChange.bind(this);
  }

  componentDidMount() {
    MarkdownUtil.init();
    document.body.className = "blog wp-custom-logo wp-embed-responsive hfeed has-header-image has-sidebar colors-dark";
  }

  onEditAreaValueChange(event) {
    this.setState({
      "a": event.target.value
    });
  }

  render() {
    return (
    <div className={"site"}>
      <MyHeader menus={menuItems} site={site}/>
      <div className="site-content-contain">
        <div id="content" className="site-content">
          <div className="wrap">
            <div id="main"/>
            <textarea onChange={this.onEditAreaValueChange} style={{height: "400px"}}/>
            <a href="https://ericp.cn/cmd"><button style={{width: "100%", backgroundColor: "cadetblue"}}>Cmd Markdown 公式指导手册</button></a>
            <hr/>
            <div>
              {MarkdownUtil.render(this.state.a)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <LoadAllJs />
    </div>
    );
  }
}
