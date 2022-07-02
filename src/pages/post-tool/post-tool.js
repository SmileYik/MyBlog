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
            "token": "123456"
        };
        this.onEditAreaValueChange = this.onEditAreaValueChange.bind(this);
        this.updateToken = this.updateToken.bind(this);
        this.onSelectBlog = this.onSelectBlog.bind(this);
        this.onSelectAlbum = this.onSelectAlbum.bind(this);
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
                _this.onSelectBlog();
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
                _this.onSelectAlbum();
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
            }
        })
    }

    spawnToolAside() {
        return (
            <Fragment>
                <label htmlFor="input-token">密钥 (<span id="useToken" onClick={this.updateToken}> 应用 </span>)</label>
                <input type="text" id="input-token"/>

                <br/>
                <hr/>
                <label htmlFor="input-title">标题</label>
                <input type="text" id="input-title"/>
                <br/>
                <label htmlFor="input-author">作者</label>
                <input type="text" id="input-author"/>
                <br/>
                <label htmlFor="input-tag">标签</label>
                <input type="text" id="input-tag"/>
                <br/>
                <hr/>
                <label htmlFor="input-id">id</label>
                <input type="text" id="input-id"/>
                <br/>
                <label htmlFor="input-markdown">Markdown</label>
                <input type="text" id="input-markdown"/>
                <br/>
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
                <select style={{width: "100%"}} id="input-item">
                    {this.state.items.map((item => {
                        return <option key={item.id} value={item.id}>{item.title}</option>
                    }))}
                </select>
                <br/>
                <br/>
                <label htmlFor="input-index">插入位置</label>
                <input type="number" value='0' id="input-index"/>
                <button>发表</button>
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
                                <a href="https://ericp.cn/cmd"><button style={{width: "100%", backgroundColor: "cadetblue"}}>Cmd Markdown 公式指导手册</button></a>
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
                    <Footer />
                </div>
                {/*<LoadAllJs />*/}
            </div>
        );
    }
}
