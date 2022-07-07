export const menuItems = [
  {
    id: "menu-item-0",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-0",
    href: "/",
    name: "首页"
  },
  {
    id: "menu-item-2",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-1",
    href: "?blog=readBook",
    name: "学习"
  },
  {
    id: "menu-item-3",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-2",
    href: "?blog=problems",
    name: "算法题解"
  },
  {
    id: "menu-item-3",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-3",
    href: "?blog=other",
    name: "其他"
  },
  {
    id: "menu-item-4",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-4",
    href: "./badapple/badApple.html",
    name: "BadApple!!!"
  },
  {
    id: "menu-item-5",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-5",
    href: "?tool=postTool",
    name: "快速发布"
  }
];

export const site = {
  url: "/",
  icons: {
    normal: "./common/images/ico_normal.jpg",
    icon150: "./common/images/ico_150.jpg",
    icon100: "./common/images/ico_100.jpg",
    alt: "Smile Yik's Blog"
  },
  title: "Smile Yik's Blog",
  description: "小奕的个人博客",
  background: {
    background: "./common/images/background.png",
    alt: "Smile Yik's Blog"
  }
}

export const blogs = {
  quickPost: {
    requestHead: "http://1.14.193.189:8083/",
    webSocketRequestHead: "ws://1.14.193.189:8083/"
  },
  "other": {
    id: "other",
    title: "其他 - Smile Yik's Blog",
    base: "./blogs/other/",
    markdownBase: "markdowns/",
    markdownAlbumsBase: "albums/",
    albums: "all-albums.json",
    newestPost: "newest-post.json",
    getMarkdownBase: function () {
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
    getSubPageTitle: function (keyWords) {
      return keyWords + " - Smile Yik's Blog";
    }
  },
  "problems": {
    id: "problems",
    title: "算法题解 - Smile Yik's Blog",
    base: "./blogs/problems/",
    markdownBase: "markdowns/",
    markdownAlbumsBase: "albums/",
    albums: "all-albums.json",
    newestPost: "newest-post.json",
    getMarkdownBase: function () {
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
    getSubPageTitle: function (keyWords) {
      return keyWords + " - Smile Yik's Blog";
    }
  },
  "readBook": {
    id: "readBook",
    title: "学习 - Smile Yik's Blog",
    base: "./blogs/readBook/",
    markdownBase: "markdowns/",
    markdownAlbumsBase: "albums/",
    albums: "all-albums.json",
    newestPost: "newest-post.json",
    getMarkdownBase: function () {
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
    getSubPageTitle: function (keyWords) {
      return keyWords + " - Smile Yik's Blog";
    }
  }
};
