import React from "react";
import "./book-aside.css"

export default class BookAside extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(id) {
    return this.props.onItemClick(id);
  }

  render() {
    return (
      <aside id="secondary" className="widget-area" role="complementary" aria-label="博客边栏">
        <section className="widget widget_recent_entries">
          <h2 className="widget-title">
            目录
          </h2>
          <ul className="contentItemList">
            <li>
              <ul>
                {
                  this.props.items.map((item) => {
                    return <BookAsideSection key={item.id} item={item} onItemClick={this.onItemClick}/>
                  })
                }
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

class BookAsideSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id
    }
    this.onItemClick = this.onItemClick.bind(this);
    this.onItemClickAside = this.onItemClickAside.bind(this);
  }

  onItemClick(event) {
    this.props.onItemClick(event.target.id);
  }

  onItemClickAside(value) {
    this.props.onItemClick(value);
  }

  render() {
    if (this.props.item.items && this.props.item.items.length > 0) {
      return (
        <li>
          <div>
            <div onClick={this.onItemClick} id={this.props.item.id} className="contentItem">
              {this.props.item.title}
            </div>
            <ul>
              {this.props.item.items.map((item => {
                return <BookAsideSection key={item.id} item={item} onItemClick={this.onItemClickAside}/>
              }))}
            </ul>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <div onClick={this.onItemClick}
               id={this.props.item.id}
               className="contentItem">
            {this.props.item.title}
          </div>
        </li>
      );
    }
  }
}