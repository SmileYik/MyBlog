import React, {Fragment} from "react";
import MyHeader from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import {blogs, menuItems, site} from "../../utils/siteInfo";
import jQuery from "jquery";
import {MarkdownUtil} from "../../utils/MarkdownUtil";
import {ArticleHeaderMetaSwitchTime} from "../../components/Article/article";

export default class PostTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "prevContent": "",
      "header": {
        "title": "Title",
        "meta": {
          "postTime": new Date().getTime() + 100000,
          "modifyTime": new Date().getTime() + 100000000,
          "author": "Guest"
        }
      },
      "blog": "",
      "album": "",
      "blogs": [],
      "albums": [],
      "items": [],
      "token": "123456",
      "markdown": "",
      "itemId": "",
      "tags": "",
      "cmdLog": ""
    };
    this.onEditAreaValueChange = this.onEditAreaValueChange.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.onSelectBlog = this.onSelectBlog.bind(this);
    this.onSelectAlbum = this.onSelectAlbum.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onPostButtonClick = this.onPostButtonClick.bind(this);
    this.onApplyButtonClick = this.onApplyButtonClick.bind(this);
  }

  componentDidMount() {
    MarkdownUtil.init();
    document.body.className = "blog wp-custom-logo wp-embed-responsive hfeed has-header-image has-sidebar colors-dark";
  }

  onEditAreaValueChange(event) {
    this.setState({
      "prevContent": event.target.value
    });
  }

  getHeaderMeta(meta) {
    if (!meta) {
      return <Fragment/>;
    }
    return (
      <div className="entry-meta">
        <ArticleHeaderMetaSwitchTime meta={meta}/>
        <br/>
        <span>
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

  updateToken() {
    const _this = this;
    let token = jQuery("#input-token")[0].value
    jQuery.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("TOKEN", token)
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
      }
    })
    jQuery.ajax({
      type: "get",
      url: blogs.quickPost.requestHead + "blog",
      async: true,
      contextType: "application/json",
      success: function (res) {
        if (res === "") return;
        _this.setState({
          blogs: res.result
        })
        setTimeout(_this.onSelectBlog, 100)
      }
    })
    this.setState({
      "token": token
    })
  }

  onSelectBlog() {
    const blog = jQuery("#input-blog")[0].value
    const _this = this;
    jQuery.ajax({
      type: "get",
      url: blogs.quickPost.requestHead + "simpleAlbum/" + blog,
      async: true,
      contextType: "application/json",
      success: function (res) {
        if (res === "") return;
        _this.setState({
          blog: blog,
          albums: res.result
        })
        setTimeout(_this.onSelectAlbum, 100);

      }
    })
  }

  onSelectAlbum() {
    const album = jQuery("#input-album")[0].value;
    const _this = this;
    jQuery.ajax({
      type: "get",
      url: blogs.quickPost.requestHead + "album/" + this.state.blog + "/" + album,
      async: true,
      contextType: "application/json",
      success: function (res) {
        if (res === "") return;
        _this.setState({
          album: album,
          items: res.result
        })
        setTimeout(_this.onSelectItem, 100)
      }
    })
  }

  onSelectItem() {
    const _this = this;
    const item = jQuery("#input-item")[0].value;
    if (item === "null") {
      _this.setState({
        "itemId": item,
      })
    }
    this.state.items.forEach(it => {
      if (item === it.id) {
        _this.setState({
          "markdown": it.markdown,
          "itemId": it.id,
          "tags": it.tag
        })
      }
    })
  }

  onTitleChange() {
    this.setState(old => {
      let header = old.header;
      header.title = jQuery("#input-title")[0].value;
      return {
        "header": header
      }
    })
  }

  onAuthorChange() {
    this.setState(old => {
      let header = old.header;
      header.meta.author = jQuery("#input-author")[0].value;
      return {
        "header": header
      }
    })
  }

  onPostButtonClick() {
    const _this = this;
    const item = {
      "id": jQuery("#input-id")[0].value,
      "author": this.state.header.meta.author,
      "items": [],
      "tag": this.state.tags,
      "title": this.state.header.title,
      "prev": this.state.prevContent,
      "markdown": jQuery("#input-markdown")[0].value,
      "modifyTime": 0,
      "postTime": new Date().getTime()
    };

    const url = blogs.quickPost.requestHead +
                "album/" +
                this.state.blog + "/" +
                this.state.album + "/" +
                this.state.itemId + "/" +
                jQuery("#input-index")[0].value;
    console.log(url)
    console.log(item)

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("TOKEN", this.state.token)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        _this.setState({
          "cmdLog": JSON.parse(xhr.responseText).result
        })
      }
    }
    xhr.send(JSON.stringify(item))
  }

  onApplyButtonClick() {
    const ws = new WebSocket(blogs.quickPost.webSocketRequestHead + "cmd/" + this.state.token + "/deploy")
    ws.onopen = () => {
      console.log("open.....")
    }
    ws.onerror = (e) => {
      console.log(e)
    }
    ws.onmessage = (msg) => {
      this.setState(old => {
        return {
          "cmdLog": old.cmdLog + "\n\r" + msg.data
        }
      })
    }
  }


  spawnToolAside() {
    return (
      <Fragment>
        <label htmlFor="input-token">密钥 (<span id="useToken" onClick={this.updateToken}> 应用 </span>)</label>
        <input type="password" id="input-token"/>

        <br/>
        <hr/>
        <label htmlFor="input-title">标题</label>
        <input type="text" id="input-title" defaultValue={this.state.header.title} onChange={this.onTitleChange}/>
        <br/>
        <label htmlFor="input-author">作者</label>
        <input type="text" id="input-author" defaultValue={this.state.header.meta.author} onChange={this.onAuthorChange}/>
        <br/>
        <label htmlFor="input-tag">标签</label>
        <input type="text" id="input-tag" defaultValue={this.state.tags}/>
        <br/>
        <hr/>
        <label htmlFor="input-blog">Blog</label>
        <select style={{width: "100%"}} id="input-blog" onChange={this.onSelectBlog}>
          {this.state.blogs.map((item => {
            return <option key={item} value={item}>{item}</option>
          }))}
        </select>
        <br/>
        <br/>
        <label htmlFor="input-album">文章集</label>
        <select style={{width: "100%"}} id="input-album" onChange={this.onSelectAlbum}>
          {this.state.albums.map((item => {
            return <option key={item.id} value={item.id}>{item.title}</option>
          }))}
        </select>
        <br/>
        <br/>
        <label htmlFor="input-item">属于</label>
        <select style={{width: "100%"}} id="input-item" onChange={this.onSelectItem}>
          <option value="null">不属于任何一篇文章下</option>
          {this.state.items.map((item => {
            return <option key={item.id} value={item.id}>{item.title}</option>
          }))}
        </select>
        <br/>
        <br/>
        <label htmlFor="input-id">id</label>
        <input type="text" id="input-id" defaultValue={this.state.itemId}/>
        <br/>
        <hr/>
        <label htmlFor="input-markdown">Markdown</label>
        <input type="text" id="input-markdown" defaultValue={this.state.markdown}/>
        <br/>
        <label htmlFor="input-index">插入位置</label>
        <input type="number" id="input-index" defaultValue={0}/>
        <br/>
        <button onClick={this.onPostButtonClick}>发表</button>
        <span> </span>
        <button onClick={this.onApplyButtonClick}>应用</button>
        <hr/>
        <pre>{this.state.cmdLog}</pre>
      </Fragment>
    )
  }

  render() {
    return (
      <div className={"site"}>
        <MyHeader menus={menuItems} site={site}/>
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div className="wrap">
              <div className={"markdownEditArea"}>
                <textarea onChange={this.onEditAreaValueChange} style={{height: "400px"}}/>
                <a href="https://ericp.cn/cmd">
                  <button style={{width: "100%", backgroundColor: "cadetblue"}}>Cmd Markdown 公式指导手册</button>
                </a>
              </div>
              <hr/>
              <div id="primary" className="content-area">
                <main id="main" className="site-main" role="main">
                  <article className="post type-post status-publish format-standard hentry category-uncategorized">
                    <header className="entry-header">
                      {this.getHeaderMeta(this.state.header.meta)}
                      <h1 className="entry-title">
                        {this.state.header.title}
                      </h1>
                    </header>
                    {MarkdownUtil.render(this.state.prevContent)}
                  </article>
                </main>
              </div>
              <aside id="secondary" className="widget-area" role="complementary" aria-label="博客边栏">
                {this.spawnToolAside()}
              </aside>
            </div>
          </div>
          <Footer/>
        </div>
        {/*<LoadAllJs />*/}
      </div>
    );
  }
}
