import React, {Component, Fragment} from "react";
import MyHeader from "../../components/Header/Header";
import {menuItems, site} from "../../utils/siteInfo";
import Footer from "../../components/Footer/footer";
import LoadAllJs from "../../utils/JsLoader";
import {MarkdownUtil} from "../../utils/MarkdownUtil";

export default class MarkdownPrev extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "value": ""
    };
    this.onEditAreaValueChange = this.onEditAreaValueChange.bind(this);
  }

  onEditAreaValueChange(event) {
    this.setState({
      "value": event.target.value
    });
  }

  render() {
    return (
      <div className={"site"}>
        <MyHeader menus={menuItems} site={site} marginBottom={"72px;"}/>
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div className="wrap">
              <div id="primary" className="content-area">
                <main id="main" className="site-main" role="main">
                  <textarea onChange={this.onEditAreaValueChange} />
                  <hr/>
                  <div>
                    {MarkdownUtil.render(this.state.value)}
                  </div>
                </main>
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