export const menuItems = [
  {
    id: "menu-item-0",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-0",
    href: "/",
    name: "首页"
  },
  {
    id: "menu-item-1",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-1",
    href: "?blog=other",
    name: "其他"
  },
  {
    id: "menu-item-2",
    clazz: "menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-2",
    href: "./badapple/badApple.html",
    name: "BadApple!!!"
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
  }
};