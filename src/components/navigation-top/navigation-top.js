import React, { Fragment } from 'react';
import LoadAllJs from '../../utils/JsLoader';

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
            <button className="menu-toggle" aria-controls="top-menu" aria-expanded="false">
              <svg className="icon icon-bars" aria-hidden="true" role="img">
                <use href="#icon-bars" xlinkHref="#icon-bars"></use>
              </svg>
              <svg className="icon icon-close" aria-hidden="true" role="img">
                <use href="#icon-close" xlinkHref="#icon-close"></use>
              </svg>
              菜单
            </button>

            <div className="menu-%e9%a1%b6%e9%83%a8%e8%8f%9c%e5%8d%95-container">
              <ul id="top-menu" className="menu">
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
