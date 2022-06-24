import React from 'react';
import Main from '../../pages/main/main';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';

const App =() => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.MAIN} element={<Main />}>
          </Route>
          <Route path={AppRoute.STREAM} element={<Main />}>
          </Route>
        </Routes>
      </BrowserRouter>
  )
};

export default App;