import Index from "./pages/index";
import {BrowserRouter as Router, Route, Routes, useSearchParams} from 'react-router-dom';
import {Albums} from "./pages/albums/albums";
import AlbumWrapper from "./pages/album/album";
import BookWrapper from "./pages/book/book";
import React from "react";
import {blogs} from "./utils/siteInfo";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="*" element={<RouteWrapper />}/>
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

function RouteWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
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
