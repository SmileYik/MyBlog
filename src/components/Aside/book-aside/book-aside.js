import React, {Fragment} from "react";
import "./book-aside.css"


export default function BookAside(props) {
  return (
    <aside id="secondary" className="widget-area" role="complementary" aria-label="博客边栏">
      <BookAsideIndexSection heads={props.heads}/>
      <BookAsideBookSection items={props.items} basedUrl={props.basedUrl}/>
    </aside>
  );
}

function BookAsideIndexSection(props) {
  if (!props.heads) {
    return <Fragment />;
  }
  return (
    <section className="widget widget_recent_entries">
      <h2 className="widget-title">
        当前目录
      </h2>
      <ul className="contentItemList">
        <li>
          <ul>
            {
              props.heads.map((item) => {
                return <BookAsideIndexItem key={item.text} item={item}/>
              })
            }
          </ul>
        </li>
      </ul>
    </section>
  );
}

function BookAsideBookSection(props) {
  return (
      <section className="widget widget_recent_entries">
        <h2 className="widget-title">
          文章目录
        </h2>
        <ul className="contentItemList">
          <li>
            <ul>
              {
                props.items.map((item) => {
                  return <BookAsideSection key={item.id} item={item} basedUrl={props.basedUrl}/>
                })
              }
            </ul>
          </li>
        </ul>
      </section>
  );
}

class BookAsideSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      basedUrl: props.basedUrl
    }
  }

  render() {
    if (this.props.item.items && this.props.item.items.length > 0) {
      return (
        <li>
          <div>
            <a href={this.props.basedUrl + this.props.item.id}>
            <div id={this.props.item.id} className="contentItem">
              {this.props.item.title}
            </div>
            </a>
            <ul>
              {this.props.item.items.map((item => {
                return <BookAsideSection key={item.id} item={item} basedUrl={this.props.basedUrl}/>
              }))}
            </ul>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <a href={this.props.basedUrl + this.props.item.id}>
          <div id={this.props.item.id} className="contentItem">
            {this.props.item.title}
          </div>
          </a>
        </li>
      );
    }
  }
}

class BookAsideIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.item.childs && this.props.item.childs.length > 0) {
      return (
        <li>
          <div>
            <a href={'#' + encodeURIComponent(this.props.item.text)}>
              {this.props.item.text}
            </a>
            <ul>
              {this.props.item.childs.map((item => {
                return <BookAsideIndexItem key={item.text} item={item}/>
              }))}
            </ul>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <a href={'#' + encodeURIComponent(this.props.item.text)}>
            {this.props.item.text}
          </a>
        </li>
      );
    }
  }
}
