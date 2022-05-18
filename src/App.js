import Index from "./pages/index";
import {BrowserRouter as Router, Route, Routes, useSearchParams} from 'react-router-dom';
import {Albums} from "./pages/albums/albums";
import AlbumWrapper from "./pages/album/album";
import BookWrapper from "./pages/book/book";
import React from "react";
import {blogs} from "./utils/siteInfo";
import MarkdownPrev from "./pages/markdown-tool/markdown-tool";
import "./common/style/addtion.style.css"

function App() {
  return (
    <Router>
      <Routes>
          <Route path="*" element={<LinkFixWrapper />}/>
          {/*<Route path="index" element={<Index />}/>*/}
          {/*<Route path="index?blog=:bid" element={<AlbumsWrapper />}/>*/}
          {/*<Route path=":bid/">*/}
          {/*  <Route index element={<Navigate to="album" />} />*/}
          {/*  <Route path="album/">*/}
          {/*    <Route path="" element={<AlbumsWrapper />}/>*/}
          {/*    <Route path=":aid">*/}
          {/*      <Route path="" element={<AlbumWrapper />}/>*/}
          {/*      <Route path=":iid" element={<BookWrapper />}/>*/}
          {/*    </Route>*/}
          {/*  </Route>*/}
          {/*</Route>*/}
      </Routes>
    </Router>
  );
}



function scrollToAnchor(name) {
  if (!name) {
    return;
  }
  const elem = document.getElementById(name);
  if (elem) {
    const temp = document.getElementsByClassName("custom-header")[0];
    if (temp && temp.style &&
      temp.style["margin-bottom"] &&
      temp.style["margin-bottom"].length === 3) {
      // 小屏幕
      elem.scrollIntoView({block: "start", behavior: "smooth"});
    } else {
      window.scrollTo({
        top: elem.getBoundingClientRect().top - 45,
        left: elem.getBoundingClientRect().left,
        behavior: "smooth"
      })
    }
  }
}

function onATagClicked(event) {
  if (event.target.hash && event.target.hash.startsWith("#")) {
    event.preventDefault();
    scrollToAnchor(event.target.hash.substring(1));
  } else if (event.target.parentElement.hash &&
    event.target.parentElement.hash.startsWith("#")) {
    event.preventDefault();
    scrollToAnchor(event.target.parentElement.hash.substring(1));
  }
}

function LinkFixWrapper() {
  return (
    <div onClick={onATagClicked}>
      <RouteWrapper />
      <div className="scroll-to-top">
        <a href="#main" title="滚动到头顶">
          <img height='48' width="48" src="../common/images/up-to-top.png"/>
        </a>
      </div>
    </div>
  );
}

function RouteWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tool = searchParams.get("tool");
  if (tool != null) {
    if (tool === "markdown") {
      return <MarkdownPrev />
    }
  }

  const blogId = searchParams.get("blog");
  const albumId = searchParams.get("album");
  const itemId = searchParams.get("post");
  if (blogId != null && blogs[blogId]) {
    if (albumId != null) {
      if (itemId != null) {
        return <BookWrapper bid={blogId} aid={albumId} iid={itemId} />;
      }
      return <AlbumWrapper bid={blogId} aid={albumId} />;
    }
    return <Albums bid={blogId} />
  }
  return <Index />;
}

export default App;
