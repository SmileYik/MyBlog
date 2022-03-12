import React, {Fragment} from "react";
import jQuery from "jquery"
import MyHeader from "../../components/Header/Header";
import {PostArticle} from "../../components/Article/article";
import BookAside from "../../components/Aside/book-aside/book-aside";
import Footer from "../../components/Footer/footer";
import {blogs, menuItems, site} from "../../utils/siteInfo";
import {Link, Navigate, useParams} from "react-router-dom";
import Index from "../index";
import LoadAllJs from "../../utils/JsLoader";

export default function AlbumWrapper(props) {
  const blog = blogs[props.bid];
  if (blog) {
    let nav = <Fragment/>;
    jQuery.ajax({
      url: blog.getMarkdownAlbumsBase() + props.aid + ".json",
      async: false,
      contextType: "application/json",
      success: function (res) {
        if (res.items) {
          nav = <Album bid={props.bid} album={res}/>;
        } else {
          nav = <Index />;
        }
      }
    });
    return (
      nav
    );
  } else {
    return (
      <Index />
    );
  }
}

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: props.album,
      blog: blogs[props.bid],
      startIndex: 0,
      step: 5,
      itemsJsx: []
    }
    this.onItemClick = this.onItemClick.bind(this);
  }

  componentDidMount() {
    document.getElementsByTagName("body")[0].className = "blog wp-custom-logo wp-embed-responsive hfeed has-header-image has-sidebar colors-dark";
    document.title = this.state.blog.getSubPageTitle(this.state.album.title);
    this.shapeItems();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    document.title = this.state.blog.getSubPageTitle(this.state.album.title);
  }

  shapeItems() {
    this.setState((state, props) => {
      let itemsJsx = state.itemsJsx;
      const items = state.album.items;
      for (let i = state.startIndex; i < state.step && i < items.length; ++i) {
        const header = {
          title: <Link to={"?blog=" + state.blog.id + "&album=" + state.album.id + "&post=" + items[i].id}>{items[i].title}</Link>,
          meta: {
            modifyTime: items[i].modifyTime,
            postTime: items[i].postTime,
            author: items[i].author
          }
        }
        itemsJsx.push(
          <PostArticle key={items[i].id}
                       content={items[i].prev}
                       header={header}
                       background=''/>
        );
      }
      return {
        itemsJsx: itemsJsx
      };
    });
  }

  onItemClick(item) {
    this.setState({
      nav: item
    });
  }

  render() {
    if (this.state.nav) {
      return <Navigate to={this.state.nav}/>
    }
    return (
      <Fragment>
        <MyHeader menus={menuItems} site={site} marginBottom={"72px;"}/>
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div className="wrap">
              <div id="primary" className="content-area">
                <main id="main" className="site-main" role="main">
                  {this.state.itemsJsx}
                </main>
              </div>
              <BookAside items={this.state.album.items}
                         onItemClick={this.onItemClick} />
            </div>
          </div>
          <Footer />
        </div>
        <LoadAllJs />
      </Fragment>
    );
  }
}