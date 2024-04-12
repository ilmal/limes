import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Landing from './pages';
import Header from './components/header'
import CineMate from './pages/cinemate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
          <Route exact path="/" element={<Landing />}/>
          <Route path="/cinemate" element={<CineMate/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
