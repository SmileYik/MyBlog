import React from "react";
import MyHeader from "../../components/Header/Header";
import Article from "../../components/Article/article";
import Footer from "../../components/Footer/footer";
import {menuItems, site} from "../../utils/siteInfo";
import LoadAllJs from "../../utils/JsLoader";

const article = {
  background: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg",
  comment: "这里是我的新博客, 以后的东西会放到这里$$SmileYik$$",
  header: {
    title: "Hello, World!",
    meta: {
      postTime: "1647088400354",
      author: "Smile Yik"
    }
  }
}

const article2 = {
  background: "https://images.pexels.com/photos/556669/pexels-photo-556669.jpeg",
  comment: "本博客的源代码和文章都托管在我的Github仓库中, " +
           "如果你对我的仓库感兴趣, 欢迎[Star](https://github.com/SmileYik/MyBlog)!" +
           "此外, 本博客中的所有文章未经允许谢绝以任何形式二次发布或商用(虽然什么东西都没有).$$SmileYik$$",
  header: {
    title: "关于源代码!",
    meta: {
      postTime: "1647088400354",
      author: "Smile Yik"
    }
  }
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    document.getElementsByTagName("body")[0].className = "home page-template-default page page-id-8 wp-custom-logo wp-embed-responsive twentyseventeen-front-page has-header-image page-two-column colors-dark";
  }

  render() {
    return (
      <div className={"site"}>
        <MyHeader menus={menuItems} site={site} marginBottom={"0px"} />
        <div className="site-content-contain">
          <div id="content" className="site-content">
            <div id="primary" className="content-area">
              <main id="main" className="site-main" role="main">
                <Article content={article.comment}
                         header={article.header}
                         background={article.background}/>
                <hr />
                <Article content={article2.comment}
                         header={article2.header}
                         background={article2.background}/>
              </main>
            </div>
          </div>
          <Footer />
        </div>
        <LoadAllJs />
      </div>
    );
  }
}