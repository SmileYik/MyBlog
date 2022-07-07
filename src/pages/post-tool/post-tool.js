import React, {Fragment} from "react";
import MyHeader from "../../components/Header/Header";
import Footer from "../../components/Footer/footer";
import {blogs, menuItems, site} from "../../utils/siteInfo";
import jQuery from "jquery";
import {MarkdownUtil} from "../../utils/MarkdownUtil";
import {ArticleHeaderMetaSwitchTime} from "../../components/Article/article";
import SimpleMdeReact from "react-simplemde-editor";
import LoadAllJs from "../../utils/JsLoader";
import "easymde/dist/easymde.min.css";
import "./easymde.dark.css"
import "./post-tool.css"

export default class PostTool extends React.Component {
  constructor(props) {
    super(props);
    const _this = this;
    this.state = {
      "firstRender": true,
      "prevContent": "",
      "allowPrev": "",
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
      "cmdLog": "",
      "command": [],
      "simpleMdeOption": {
        autofocus: true,
        spellChecker: false,
        maxHeight: "400px",
        toolbar: [
            "bold", "italic", "strikethrough", "heading", "|",
            "quote", "code", "unordered-list", "ordered-list", "clean-block", "|",
            "link", "image", "table", "horizontal-rule", "|",
            "preview", "side-by-side", "fullscreen", "|",
            "undo", "redo", "|",
            "guide"
        ],
        previewRender(text) {
          _this.setState(old => {
            return {
              "allowPrev": old.prevContent
            }
          })
          return MarkdownUtil.renderWithoutMath(text);
        }
      }
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
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.onLoadPostButtonClick = this.onLoadPostButtonClick.bind(this);
    this.onModifyPostButtonClick = this.onModifyPostButtonClick.bind(this);
    this.onActionButtonClick = this.onActionButtonClick.bind(this);
    this.onCreateAlbumButtonClick = this.onCreateAlbumButtonClick.bind(this);
    this.onLoadAlbumButtonClick = this.onLoadAlbumButtonClick.bind(this);
    this.onModifyAlbumButtonClick = this.onModifyAlbumButtonClick.bind(this);
    this.onDeleteAlbumButtonClick = this.onDeleteAlbumButtonClick.bind(this);
    this.onDeletePostButtonClick = this.onDeletePostButtonClick.bind(this);
  }

  componentDidMount() {
    MarkdownUtil.init();
    document.body.className = "blog wp-custom-logo wp-embed-responsive hfeed has-header-image has-sidebar colors-dark";
  }

  onEditAreaValueChange(value) {
    this.setState({
      "prevContent": value
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
        setTimeout(function () {
          jQuery.get({
            url: blogs.quickPost.requestHead + "cmd",
            async: true,
            contextType: "application/json",
            success: function (res) {
              _this.setState({
                "command": res.result
              });
            }
          })
        }, 100)
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
    const url = blogs.quickPost.webSocketRequestHead + "cmd/" + this.state.token + "/" + jQuery("#input-command")[0].value
    const ws = new WebSocket(url)
    ws.onopen = () => {
      console.log("open.....")
      this.setState({
        cmdLog: "running command!"
      });
    }
    ws.onerror = (e) => {
      console.log(e)
      this.setState({
        cmdLog: "ERROR!!!!"
      });
    }
    ws.onmessage = (msg) => {
      this.setState(old => {
        return {
          "cmdLog":  msg.data + "\n\r" + old.cmdLog
        }
      })
    }
    ws.onclose = (msg) => {
      this.setState(old => {
        return {
          "cmdLog": msg.reason + "\n\r" + old.cmdLog
        }
      })
    }
  }

  uploadImage() {
    const formData = new FormData();
    formData.append("img", jQuery("#input-image-upload")[0].files[0])
    jQuery.post({
      url: blogs.quickPost.requestHead + "image",
      data: formData,
      contentType: false,
      enctype: "multipart/form-data",
      processData: false,
      success(res) {
        jQuery("#input-image-delete")[0].value = res.result
      }
    })
  }

  deleteImage() {
    const fileName = jQuery("#input-image-delete")[0].value
    jQuery.ajax({
      type: "DELETE",
      url: blogs.quickPost.requestHead + "image",
      contentType: "application/json",
      data: fileName,
      processData: false,
      success(res) {
        if (res.result === true) {
          alert("删除成功！")
        } else {
          alert("删除失败！")
        }
      }
    })
  }

  onLoadPostButtonClick() {
    const itemId = this.state.itemId;
    if (itemId === "" || itemId === "null") {
      // no select a item
      return;
    }

    const url = blogs.quickPost.requestHead +
        "album/" +
        this.state.blog + "/" +
        this.state.album + "/" +
        this.state.itemId

    jQuery.get({
      url: url,
      async: true,
      success: (res) => {
        const item = res.result;
        this.setState({
          "prevContent": item.prev,
          "allowPrev": item.prev,
          "header": {
            "title": item.title,
            "meta": {
              "postTime": item.postTime,
              "modifyTime": item.modifyTime,
              "author": item.author
            }
          },
          "itemId": item.id,
          "tags": item.tag,
        })
        jQuery("#input-title")[0].value = item.title;
        jQuery("#input-author")[0].value = item.author;
        jQuery("#input-tag")[0].value = item.tag;
        jQuery("#input-id")[0].value = item.id;
        jQuery("#input-index")[0].value = -1;
        jQuery("#input-markdown")[0].value = item.markdown;
      }
    })

  }

  onModifyPostButtonClick() {
    const _this = this;
    const item = {
      "id": jQuery("#input-id")[0].value,
      "author": this.state.header.meta.author,
      "items": [],
      "tag": this.state.tags,
      "title": this.state.header.title,
      "prev": this.state.prevContent,
      "markdown": jQuery("#input-markdown")[0].value,
      "modifyTime": new Date().getTime(),
      "postTime": this.state.header.meta.postTime
    };
    const index = jQuery("#input-index")[0].value;
    let url = blogs.quickPost.requestHead +
        "album/" +
        this.state.blog + "/" +
        this.state.album;
    if (index !== "-1") {
      url = url + "/" + this.state.itemId + "/" + index;
    }
    console.log(url)
    console.log(item)

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
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

  onCreateAlbumButtonClick() {
    let url = blogs.quickPost.requestHead + "simpleAlbum/" + this.state.blog
    const data = {
      "album": {
        "id": jQuery("#input-id")[0].value,
        "author": this.state.header.meta.author,
        "modifyTime": new Date().getTime(),
        "title": this.state.header.title
      },
      markdown: this.state.prevContent
    }

    jQuery.post({
      url: url,
      async: true,
      data: JSON.stringify(data),
      contentType: "application/json",
      processData: false,
      success(res) {
        console.log(res)
      }
    })
  }

  onLoadAlbumButtonClick() {
    const _this = this;
    let url = blogs.quickPost.requestHead + "simpleAlbum/" + this.state.blog + "/" + this.state.album
    jQuery.get({
      url: url,
      async: true,
      success(res) {
        const result = res.result;
        _this.setState({
          "prevContent": res.msg,
          "allowPrev": res.msg,
          "header": {
            "title": result.title,
            "meta": {
              "postTime": 0,
              "modifyTime": result.modifyTime,
              "author": result.author
            }
          },
          "itemId": result.id,
        });
        jQuery("#input-title")[0].value = result.title;
        jQuery("#input-author")[0].value = result.author;
        jQuery("#input-id")[0].value = result.id;
      }
    })
  }

  onModifyAlbumButtonClick() {
    let url = blogs.quickPost.requestHead + "simpleAlbum/" + this.state.blog
    const data = {
      "album": {
        "id": jQuery("#input-id")[0].value,
        "author": this.state.header.meta.author,
        "modifyTime": new Date().getTime(),
        "title": this.state.header.title
      },
      markdown: this.state.prevContent
    }

    jQuery.ajax({
      url: url,
      type: "PUT",
      async: true,
      data: JSON.stringify(data),
      contentType: "application/json",
      processData: false,
      success(res) {
        if (res.result === true) {
          alert("修改成功！")
        } else {
          alert("修改失败！")
        }
      }
    })
  }

  onDeletePostButtonClick() {
    let url = blogs.quickPost.requestHead +
        "album/" +
        this.state.blog + "/" +
        this.state.album + "/" + this.state.itemId;

    jQuery.ajax({
      type: "DELETE",
      url: url,
      async: true,
      success: (res) => {
        if (res.result.id) {
          alert("删除成功！");
        } else {
          alert("删除失败！");
        }
      }
    })
  }

  onDeleteAlbumButtonClick() {
    let url = blogs.quickPost.requestHead + "simpleAlbum/" + this.state.blog + "/" + this.state.album;
    jQuery.ajax({
      type: "DELETE",
      url: url,
      async: true,
      success: (res) => {
        if (res.result === true) {
          alert("删除成功！");
        } else {
          alert("删除失败！");
        }
      }
    })
  }

  onActionButtonClick() {
    const action = jQuery("#input-choose-action")[0].value;
    switch (action) {
      case "0": this.onLoadPostButtonClick(); break;
      case "1": this.onModifyPostButtonClick(); break;
      case "2": this.onPostButtonClick(); break;
      case "3": this.onCreateAlbumButtonClick(); break;
      case "4": this.onLoadAlbumButtonClick(); break;
      case "5": this.onModifyAlbumButtonClick(); break;
      case "6": this.onDeletePostButtonClick(); break;
      case "7": this.onDeleteAlbumButtonClick(); break;
    }
  }


  spawnToolAside() {
    return (
      <div className="tool-bar">
        <label htmlFor="input-token">密钥 (<span id="useToken" onClick={this.updateToken}> 应用 </span>)</label>
        <input type="password" id="input-token"/>
        <hr/>
        <label htmlFor="input-title">标题</label>
        <input type="text" id="input-title" defaultValue={this.state.header.title} onChange={this.onTitleChange}/>
        <label htmlFor="input-author">作者</label>
        <input type="text" id="input-author" defaultValue={this.state.header.meta.author} onChange={this.onAuthorChange}/>
        <label htmlFor="input-tag">标签</label>
        <input type="text" id="input-tag" defaultValue={this.state.tags}/>
        <hr/>
        <label htmlFor="input-blog">Blog</label>
        <select id="input-blog" onChange={this.onSelectBlog}>
          {this.state.blogs.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        <br/>
        <label htmlFor="input-album">文章集</label>
        <select id="input-album" onChange={this.onSelectAlbum}>
          {this.state.albums.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
        <label htmlFor="input-item">属于</label>
        <select id="input-item" onChange={this.onSelectItem}>
          <option value="null">不属于任何一篇文章下</option>
          {this.state.items.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
        <label htmlFor="input-id">id</label>
        <input type="text" id="input-id" defaultValue={this.state.itemId}/>
        <hr/>
        <label htmlFor="input-markdown">Markdown</label>
        <input type="text" id="input-markdown" defaultValue={this.state.markdown}/>
        <label htmlFor="input-index">插入位置</label>
        <input type="number" id="input-index" defaultValue={0}/>
        <div>
          <select id="input-choose-action">
            <option value="0">读取文章</option>
            <option value="1">修改文章</option>
            <option value="2">发表文章</option>
            <option value="3">创建文章集</option>
            <option value="4">读取文章集</option>
            <option value="5">修改文章集</option>
            <option value="6">删除文章</option>
            <option value="7">删除文章集</option>
          </select>
          <button onClick={this.onActionButtonClick}>执行操作</button>
        </div>
        <hr/>
        <label htmlFor="input-command">指令</label>
        <div>
          <select id="input-command">
            {this.state.command.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
          <button onClick={this.onApplyButtonClick}>应用</button>
        </div>

        <pre style={{height: "200px"}}>{this.state.cmdLog}</pre>
        <hr/>
        <div>
          <label htmlFor="input-image-upload">上传图片</label>
          <input type="file" id="input-image-upload"/>
          <button onClick={this.uploadImage}>上传</button>
        </div>
        <div>
          <input type="text" id="input-image-delete"/>
          <button onClick={this.deleteImage}>删除</button>
        </div>
      </div>
    )
  }

  renderJs() {
    if (this.state.firstRender) {
      setTimeout(() => {
        this.setState({
          "firstRender": false
        })
      }, 100)
      return <LoadAllJs/>
    } else {
      return <Fragment/>
    }
  }

  render() {
    return (
      <div className={"site"}>
        <MyHeader menus={menuItems} site={site}/>
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div className="wrap">
              <div className={"markdownEditArea"}>
                <SimpleMdeReact value={this.state.prevContent} onChange={this.onEditAreaValueChange} options={this.state.simpleMdeOption}/>
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
                      <h1 className="entry-title"> {this.state.header.title} </h1>
                    </header>
                    {MarkdownUtil.render(this.state.allowPrev)}
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
        {this.renderJs()}
      </div>
    );
  }
}
