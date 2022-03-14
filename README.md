# 快速部署

## 1. 初始化博客

让你的博客文件结构重置到初始状态.

- 清理public文件夹
```
❯ tree ./public
./public
├── blogs 存放博客文章
├── CNAME 记录自定义域名
├── common 
│   ├── data
│   │   └── music-box
│   │       └── musics.json 音乐盒歌词及曲目信息
│   ├── images
│   │   ├── background.png  主页背景
│   │   ├── ico_100.jpg     博客头像
│   │   ├── ico_150.jpg     博客头像
│   │   └── ico_normal.jpg  博客头像
│   └── js
│       ├── global.js
│       ├── jquery.min.js
│       ├── music-box.js
│       └── navigation.js
├── favicon.ico
├── index.html              首页
├── manifest.json
└── robots.txt
```

- src文件夹结构

```
❯ tree ./src
./src
├── App.js
├── common
│   ├── js
│   └── style                                 要用到的公共样式
│       ├── blocks.css
│       ├── colors-dark.css
│       ├── night-owl.min.css
│       ├── style.css
│       ├── style.min.css
│       └── theme.min.css
├── components                                博客的组件
│   ├── Article
│   │   └── article.js                  
│   ├── Aside
│   │   ├── aside.js                    
│   │   ├── book-aside
│   │   │   ├── book-aside.css
│   │   │   └── book-aside.js
│   │   └── newest-post-aside
│   │       ├── newest-post-aside.css
│   │       └── newest-post-aside.js
│   ├── CustomHeader
│   │   └── CustomHeader.js
│   ├── Footer
│   │   └── footer.js
│   ├── Header
│   │   └── Header.js
│   └── navigation-top
│       └── navigation-top.js
├── index.js
├── pages
│   ├── album
│   │   └── album.js
│   ├── albums
│   │   └── albums.js
│   ├── book
│   │   └── book.js
│   ├── index
│   │   └── index.js
│   └── markdown-tool
│       └── markdown-tool.js
├── reportWebVitals.js
└── utils
    ├── JsLoader.js
    ├── MarkdownUtil.js
    └── siteInfo.js                     存放站点配置信息, 包括菜单栏等

19 directories, 27 files
```

## 2. 对博客进行配置

### 对 public/index.html 文件进行修改

将以下一句修改成为
`https://<github用户名>.github.io/<你的仓库名>`

```
<base href="https://blog.smileyik.tk"/>
```

之后修改你需要修改的meta标签内容即可

### 对src/utils/siteInfo.js进行配置

```
export const menuItems = [
  {
    id: "menu-item-0", // 菜单id
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-0",
    href: "/",     // 跳转到的页面
    name: "首页"    // 菜单名
  }
];

export const site = {
  url: "/",        //主站地址.
  icons: {
    normal: "./common/images/ico_normal.jpg",  站点头像
    icon150: "./common/images/ico_150.jpg",    站点头像
    icon100: "./common/images/ico_100.jpg",    站点头像
    alt: "Smile Yik's Blog"                    站点头像加载失败后的文字
  },
  title: "Smile Yik's Blog",                   站点名称
  description: "小奕的个人博客",                  站点副标题
  background: {
    background: "./common/images/background.png",  首页背景
    alt: "Smile Yik's Blog"                        首页背景加载失败后的文字
  }
}

export const blogs = {
  "other": {                                博客id: {}
    id: "other",                            博客id
    title: "其他 - Smile Yik's Blog",        博客标题
    base: "./blogs/other/",                 博客目录是在那, 基于public文件夹
    markdownBase: "markdowns/",             博客markdowns文件存放的文件夹, 基于base目录
    markdownAlbumsBase: "albums/",          博客文章集文件存放的文件夹, 基于base目录
    albums: "all-albums.json",              记录所有文章集的文件, 基于base目录
    newestPost: "newest-post.json",         记录最新发布的文章的文件, 基于base目录
    getMarkdownBase: function () {          // 以下可以不用在意, 照抄就行
      return this.base + this.markdownBase;
    },
    getMarkdownAlbumsBase: function () {
      return this.base + this.markdownAlbumsBase;
    },
    getAlbums: function () {
      return this.base + this.albums;
    },
    getNewestPost: function () {
      return this.base + this.newestPost;
    },
    getSubPageTitle: function (keyWords) {     // 获取文章页面标题
      return keyWords + " - Smile Yik's Blog";
    }
  }
};
```

## 3. 发布到github仓库

在目录下运行如下指令即可

```
npm run deploy
```