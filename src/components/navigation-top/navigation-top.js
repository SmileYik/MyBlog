import React, { Fragment } from 'react';
import LoadAllJs from '../../utils/JsLoader';
import "./navigation-top.css";

function NavigationTopMenuItem(props) {
  const item = props.item;
  return (
    <li id={item.id}
        className={item.clazz}>
      <a href={item.href}>
        {item.name}
      </a>
    </li>
  );
}

export default class NavigationTop extends React.Component {
  first = true;

  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false
    };
    this.shapeItem = this.shapeItem.bind(this);
  }

  shapeItem() {
    return this.props.items.map((item) => <NavigationTopMenuItem key={item.id} item={item}/>);
  }

  loadJsFunction() {
    if (this.first) {
      this.first = false;
      return (<LoadAllJs />);
    } else {
      return (<div></div>);
    }
  }

  render() {
    return (
      <Fragment>
      <div className="navigation-top">
        <div className="wrap">
          <nav id="site-navigation" className="main-navigation" role="navigation" aria-label="顶部菜单">
            <button className="menu-toggle" aria-controls="top-menu" aria-expanded="false" onClick={() => this.setState((state) => {
              return {displayMenu: !state.displayMenu};
            })}>
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" data-view-component="true" className="icon icon-bars">
                  <path fillRule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fillRule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
              </svg>
              <svg className="icon icon-close" aria-hidden="true" role="img">
                <use href="#icon-close" xlinkHref="#icon-close"></use>
              </svg>
              菜单
            </button>

            <div className="menu-%e9%a1%b6%e9%83%a8%e8%8f%9c%e5%8d%95-container">
              <ul id="top-menu" className={"menu " + (this.state.displayMenu ? "display-menu" : "")}>
                {this.shapeItem()}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {this.loadJsFunction()}
      </Fragment>
    );
  }
}
