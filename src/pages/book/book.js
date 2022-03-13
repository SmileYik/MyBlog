import React, {Fragment} from "react";
import MyHeader from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import BookAside from "../../components/Aside/book-aside/book-aside";
import {blogs, menuItems, site} from "../../utils/siteInfo";
import {Link, Navigate} from "react-router-dom";
import jQuery from "jquery";
import {MarkdownUtil} from "../../utils/MarkdownUtil";
import {ArticleHeaderMetaSwitchTime} from "../../components/Article/article";
import LoadAllJs from "../../utils/JsLoader";

export default function BookWrapper(props) {
  const blog = blogs[props.bid];
  if (blog) {
    let nav = <Fragment/>;
    jQuery.ajax({
      url: blog.getMarkdownAlbumsBase() + props.aid + ".json",
      async: false,
      contextType: "application/json",
      success: function (res) {
        if (res.items) {
          nav = <Fragment>
                  <LoadAllJs />
                  <Book bid={props.bid}
                        album={res}
                        iid={props.iid}/>
                </Fragment>;
        } else {
          nav = <Navigate to={"/"} />;
        }
      }
    });
    return nav;
  } else {
    return <Navigate to={"/"} />;
  }
}

class Book extends React.Component {
  itemMap = {};
  itemList = [];
  firstItem = null;
  constructor(props) {
    super(props);
    this.state = {
      album: props.album,
      iid: props.iid,
      blog: blogs[props.bid],
      header: {},
      content: "加载中... 请稍候..."
    };
    this.onItemClick = this.onItemClick.bind(this);
    MarkdownUtil.init();
    this.bakeItems();
    this.bakeItemsList(this.state.album.items);
  }

  componentDidMount() {
    document.getElementsByTagName("body")[0].className = "book-template-default single single-book postid-69 single-format-standard wp-custom-logo wp-embed-responsive has-header-image has-sidebar colors-dark";
    jQuery("#" + this.state.iid).addClass("contentItemPick")
    this.updateTitle()
    this.getPostContent(this.state.iid);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateTitle();
  }

  scrollToAnchor(name) {
    const elem = document.getElementById(name);
    if (elem) {
      elem.scrollIntoView();
    }
  }

  getPostContent(id) {
    const _this = this;
    const item = this.itemMap[id];
    if (!item) {
      return;
    }
    this.scrollToAnchor("page");
    jQuery.ajax({
      url: this.state.blog.getMarkdownBase() + item.markdown,
      async: true,
      success: function (text) {
        _this.setState({
          content: text
        })
      },
      error: function (text) {
        _this.setState({
          content: "加载失败, 请刷新重试."
        })
      },
    });
  }

  updateTitle() {
    const item = this.itemMap[this.state.iid];
    if (item) {
      document.title = this.state.blog.getSubPageTitle(item.title);
    }
  }

  bakeItems() {
    const items = this.state.album.items;
    let temp = [];
    temp.push(items);
    while (temp.length > 0) {
      const is = temp.pop();
      for (const index in is) {
        const item = is[index];
        this.itemMap[item.id] = item;
        if (this.firstItem == null) {
          this.firstItem = item;
        }
        temp.push(item.items);
      }
    }
  }

  bakeItemsList(items) {
    if (!items || items.length === 0) {
      return;
    }
    for (const index in items) {
      const item = items[index];
      this.itemList.push(item.id);
      this.bakeItemsList(item.items);
    }
  }

  // searchItem() {
  //   let flag = true;
  //   this.setState((state) => {
  //     if (!this.itemMap[state.iid]) {
  //       this.getPostContent(this.firstItem.id);
  //       flag = false;
  //       return {
  //         iid: this.firstItem.id
  //       }
  //     }
  //   });
  //   return flag;
  // }

  onItemClick(id) {
    this.setState((state, props) => {
      if (state.iid === id) {
        return ;
      }
      jQuery("#" + state.iid).removeClass("contentItemPick");
      jQuery("#" + id).addClass("contentItemPick");
      this.getPostContent(id);
      return {
        iid: id,
        content: "加载中... 请稍候..."
      }
    })
  }

  getHeaderMeta(meta) {
    if (!meta) {
      return <Fragment/>;
    }
    return (
      <div className="entry-meta">
        <ArticleHeaderMetaSwitchTime meta={meta}/>
        <br/>
        <span className="byline">
          由
          <span className="author vcard">
            <a className="url fn n" id="postAuthor">
              {meta.author}
            </a>
          </span>
          编辑
        </span>
      </div>
    );
  }

  navNextPage() {
    const index = this.itemList.indexOf(this.state.iid);
    if (index === this.itemList.length - 1) {
      return (
        <div className="nav-next">
          <a rel="next" href="#" onClick={(event) => {
            event.preventDefault();
          }} style={{cursor: "not-allowed"}}>
            <span className="screen-reader-text">下一篇文章</span>
            <span aria-hidden="true" className="nav-subtitle">下一篇</span>
            <span className="nav-title" id="navNextTitle">
              已经是最后一篇啦!
            </span>
          </a>
        </div>
      );
    } else {
      const iid = this.itemList[index + 1];
      return (
        <div className="nav-next">
          <a rel="next" href="#" onClick={(event) => {
            event.preventDefault();
            this.onItemClick(iid);
          }}>
            <span className="screen-reader-text">下一篇文章</span>
            <span aria-hidden="true" className="nav-subtitle">下一篇</span>
            <span className="nav-title" id="navNextTitle">
              {this.itemMap[iid].title}
            </span>
          </a>
        </div>
      );
    }
  }

  navPrevPage() {
    const index = this.itemList.indexOf(this.state.iid);
    if (index === 0) {
      return (
        <div className="nav-previous">
          <a rel="prev" href="#" style={{cursor: "not-allowed"}} onClick={(event) => {
            event.preventDefault();
          }}>
            <span className="screen-reader-text" >上一篇文章</span>
            <span aria-hidden="true" className="nav-subtitle">上一篇</span>
            <span className="nav-title">
              已经到开头啦!
            </span>
          </a>
        </div>
      );
    } else {
      const iid = this.itemList[index - 1];
      return (
        <div className="nav-previous">
          <a rel="prev" href="#" onClick={(event) => {
            event.preventDefault();
            this.onItemClick(iid);
          }}>
            <span className="screen-reader-text" >上一篇文章</span>
            <span aria-hidden="true" className="nav-subtitle">上一篇</span>
            <span className="nav-title">
              {this.itemMap[iid].title}
            </span>
          </a>
        </div>
      );
    }
  }

  render() {
    const item = this.itemMap[this.state.iid];

    if (!item) {
      return <Navigate to={"/"} />;
    }

    const header = {
      title: item.title,
      meta: {
        postTime: item.postTime,
        modifyTime: item.modifyTime,
        author: item.author
      }
    }
    return (
      <Fragment>
        <MyHeader menus={menuItems} site={site} marginBottom={"72px;"}/>
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div className="wrap">
              <div id="primary" className="content-area">
                <main id="main" className="site-main" role="main">
                  <article className="post type-post status-publish format-standard hentry category-uncategorized">
                    <header className="entry-header">
                      {this.getHeaderMeta(header.meta)}
                      <h1 className="entry-title">
                        {header.title}
                      </h1>
                    </header>
                    {MarkdownUtil.render(this.state.content)}
                  </article>
                  <nav className="navigation post-navigation" role="navigation" aria-label="文章">
                    <h2 className="screen-reader-text">文章导航</h2>
                    <div className="nav-links">
                      {this.navPrevPage()}
                      {this.navNextPage()}
                    </div>
                  </nav>
                </main>
              </div>
              <BookAside items={this.state.album.items} onItemClick={this.onItemClick} />
            </div>
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
}