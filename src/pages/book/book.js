import React, {Fragment} from "react";
import MyHeader from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import BookAside from "../../components/Aside/book-aside/book-aside";
import {blogs, menuItems, site} from "../../utils/siteInfo";
import {Navigate} from "react-router-dom";
import jQuery from "jquery";
import {MarkdownUtil} from "../../utils/MarkdownUtil";
import {ArticleHeaderMetaSwitchTime} from "../../components/Article/article";

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
  heads = [];

  constructor(props) {
    super(props);
    this.state = {
      album: props.album,
      iid: props.iid,
      blog: blogs[props.bid],
      header: {},
      content: "加载中... 请稍候...",
      pageUrl: "",
      copyedPageLink: "fadeout 0.8s ease forwards",
      loaded: false
    };
    this.addHeader = this.addHeader.bind(this);
    MarkdownUtil.init(this.addHeader);
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
    this.heads = [];
    this.updateTitle();
  }

  addHeader(text, level) {
    if (level === 1 || this.heads.length === 0) {
      this.heads.push({
        text: text,
        level: level,
        childs: []
      });
    } else {
      let parent = this.heads;
      let lastHeader = this.heads[this.heads.length - 1];
      while (true) {
        if (lastHeader.level >= level) {
          parent.push({
            text: text,
            level: level,
            childs: []
          })
          break
        } else if (lastHeader.childs.length === 0) {
          lastHeader.childs.push({
            text: text,
            level: level,
            childs: []
          })
          break
        } else {
          parent = lastHeader.childs
          lastHeader = lastHeader.childs[lastHeader.childs.length - 1]
        }
      }
    }
  }

  scrollToTop() {
    document.getElementsByClassName("scroll-to-top")[0].children[0].click();
  }

  getPostContent(id) {
    const _this = this;
    const item = this.itemMap[id];
    if (!item) return;
    this.scrollToTop();
    let targetUrl = item.markdown;
    let otherPlace = true;
    if (!targetUrl.startsWith("http")) {
      targetUrl = this.state.blog.getMarkdownBase() + targetUrl;
      otherPlace = false;
    }
    jQuery.ajax({
      url: targetUrl,
      async: true,
      success: function (text) {
        if (otherPlace) text = text.replaceAll("(./", "(" + targetUrl + "/../");
        _this.setState({
          content: text,
          pageUrl: _this.spawnPageUrl(item.id),
          loaded: true
        }, () => {
          setTimeout(() => {
            const hash = window.location.hash;
            if (hash) {
              const element = document.getElementById(hash.substring(1));
              console.log(element)
              if (element) {
                window.scrollTo({
                  top: element.getBoundingClientRect().top + window.scrollY - 65,
                  left: element.getBoundingClientRect().left,
                  behavior: "smooth"
                });
              }
            }
          }, 165);
        });
      },
      error: function (_) {
        _this.setState({
          content: "加载失败, 请刷新重试.",
          pageUrl: _this.spawnPageUrl(item.id)
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

  spawnPageUrl(itemId) {
    return window.location.origin + "/?blog=" + this.state.blog.id + "&album=" + this.state.album.id + "&post=" + itemId
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
            <span className="url fn n" id="postAuthor">
              {meta.author}
            </span>
          </span>
          编辑
        </span>
      </div>
    );
  }

  currentPageLink() {
    if (this.state.loaded)
      return (
        <blockquote style={{width: "100%", fontSize: "12px"}}>
          <span >当前页面地址: </span>
          <input type="text" readOnly
                defaultValue={this.state.pageUrl}
                style={{height: "20px", width: "80%", display: "inline", fontSize: "12px", cursor: "pointer"}}
                onClick={() => {
                  navigator.clipboard.writeText(this.state.pageUrl)
                  this.setState({
                    copyedPageLink: "fadein 0.8s ease forwards"
                  }, () => setTimeout(() => {
                      this.setState({
                        copyedPageLink: "fadeout 0.8s ease forwards"
                      });
                    }, 3000));
                }}/>

          <span style={{animation: this.state.copyedPageLink}}> √ </span>
        </blockquote>
      )
    return <Fragment/>
  }

  navContent(screenRenderText, subtitle, title, idx, titleFlag) {
    return (
      <Fragment>
        <span className="screen-reader-text" >{screenRenderText}</span>
        <span aria-hidden="true" className="nav-subtitle">{subtitle}</span>
        <span className="nav-title">
          {titleFlag ? title : this.itemMap[this.itemList[idx]].title}
        </span>
      </Fragment>
    );
  }

  navNextPage() {
    const index = this.itemList.indexOf(this.state.iid);
    const flag = index === this.itemList.length - 1;
    const inside = this.navContent("下一篇文章", "下一篇", "已经是最后一篇啦", index + 1, flag);

    return (
      <div className="nav-next"> { flag ?
          <div rel="next" style={{cursor: "not-allowed"}}> {inside} </div> :
          <a rel="next" href={this.spawnPageUrl(this.itemList[index + 1])}> {inside} </a>
      }</div>
    );
  }

  navPrevPage() {
    const index = this.itemList.indexOf(this.state.iid);
    const flag = index === 0;
    const inside = this.navContent("上一篇文章", "上一篇", "已经到开头啦", index - 1, flag);

    return (
      <div className="nav-previous">{ flag ?
          <div rel="prev" style={{cursor: "not-allowed"}}> {inside} </div> :
          <a rel="prev" href={this.spawnPageUrl(this.itemList[index - 1])}> {inside} </a>
      }</div>
    );
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
        <MyHeader menus={menuItems} site={site}/>
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div className="wrap">
              <div id="primary" className="content-area">
                <main id="main" className="site-main" role="main">
                  <article className="post type-post status-publish format-standard hentry category-uncategorized">
                    <header className="entry-header">
                      {this.getHeaderMeta(header.meta)}
                      <h1 className="entry-title">{header.title}</h1>
                    </header>
                    {MarkdownUtil.render(this.state.content)}
                  </article>
                  {this.currentPageLink()}
                  <nav className="navigation post-navigation" role="navigation" aria-label="文章">
                    <h2 className="screen-reader-text">文章导航</h2>
                    <div className="nav-links">
                      {this.navPrevPage()}
                      {this.navNextPage()}
                    </div>
                  </nav>
                </main>
              </div>
              <BookAside items={this.state.album.items} heads={this.heads} basedUrl={this.spawnPageUrl("")} />
            </div>
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
}
