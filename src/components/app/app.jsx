import React from 'react';
import Main from '../../pages/main/main';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Watch from '../../pages/watch/watch';
import Stream from '../../pages/stream/stream';
import Notfound from '../../pages/notfound/notfound';

const App =() => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={AppRoute.MAIN} element={<Main />}>
          </Route>
          <Route path={AppRoute.WATCH} element={<Watch />}>
          </Route>
          <Route path={AppRoute.STREAM} element={<Stream />}>
          </Route>
          <Route path='' element={Notfound}>
          </Route>
        </Routes>
      </BrowserRouter>
  )
};

export default App;