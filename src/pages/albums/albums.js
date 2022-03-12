import React, {Fragment} from "react";
import jQuery from "jquery"
import MyHeader from "../../components/Header/Header";
import {PostArticle} from "../../components/Article/article";
import Footer from "../../components/Footer/footer";
import {blogs, menuItems, site} from "../../utils/siteInfo";
import {Link, useParams} from "react-router-dom";
import Index from "../index";
import NewestPostAside from "../../components/Aside/newest-post-aside/newest-post-aside";
import LoadAllJs from "../../utils/JsLoader";

export default function AlbumsWrapper(props) {
  const params = useParams();
  if (blogs[params.bid]) {
    return (
      <Albums bid={params.bid} />
    );
  } else {
    return (
      <Index />
    );
  }
}

class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      blog: blogs[props.bid],
      startIndex: 0,
      step: 5,
      albumsJsx: []
    }
  }

  componentDidMount() {
    const _this = this;
    document.getElementsByTagName("body")[0].className = "blog wp-custom-logo wp-embed-responsive hfeed has-header-image has-sidebar colors-dark";
    const blog = this.state.blog;
    document.title = blog.getSubPageTitle("Loading");
    const respond = jQuery.ajax({
      url: blog.getAlbums(),
      async: true,
      success: function () {
        _this.setState({
          albums: JSON.parse(respond.responseText)
        });
        _this.shapeAlbums();
      }
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    document.title = this.state.blog.title;
  }

  shapeAlbums() {
    this.setState((state, props) => {
      let albumsJsx = state.albumsJsx;
      // // pop show more
      // if (albumsJsx.length > 0) {
      //   albumsJsx.pop();
      // }

      for (let i = state.startIndex; i < state.step && i < state.albums.length; ++i) {
        const respond = jQuery.ajax({
          url: state.blog.getMarkdownAlbumsBase() + state.albums[i].id + ".md",
          async: false
        });
        const header = {
          title: <Link to={state.albums[i].id}>{state.albums[i].title}</Link>,
          meta: {
            modifyTime: state.albums[i].modifyTime,
            author: state.albums[i].author
          }
        };
        albumsJsx.push(
          <PostArticle key={state.albums[i].id}
                       content={respond.responseText}
                       header={header}
                       background=''/>
        );
      }
      return {
        albumsJsx: albumsJsx
      };
    })
  }

  render() {
    return (
      <Fragment>
        <MyHeader menus={menuItems} site={site} marginBottom={"72px;"}/>
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div className="wrap">
              <div id="primary" className="content-area">
                <main id="main" className="site-main" role="main">
                  <div>
                    {this.state.albumsJsx}
                  </div>
                </main>
              </div>
              <NewestPostAside bid={this.state.blog.id}/>
            </div>
          </div>
          <Footer />
        </div>
        <LoadAllJs />
      </Fragment>
    );
  }
}