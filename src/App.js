import Index from "./pages/index";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import AlbumsWrapper from "./pages/albums/albums";
import AlbumWrapper from "./pages/album/album";
import BookWrapper from "./pages/book/book";
import {Fragment} from "react";

function App() {
  return (
    <Router>
      <Routes basename={"/"}>
        <Route path="badapple" element={<a href={"./badapple/badApple.html"}>点我跳转</a>}/>
        <Route path="/">
          <Route index element={<Index />}/>
          <Route path="index" element={<Index />}/>
          <Route path=":bid/">
            <Route index element={<Navigate to="album" />} />
            <Route path="album/">
              <Route path="" element={<AlbumsWrapper />}/>
              <Route path=":aid">
                <Route path="" element={<AlbumWrapper />}/>
                <Route path=":iid" element={<BookWrapper />}/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
