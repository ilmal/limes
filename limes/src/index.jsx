import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Landing from './pages';
import Header from './components/Header'
import CineMate from './pages/Cinemate';
import Quotes from './pages/Quotes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
          <Route exact path="/" element={<Landing />}/>
          <Route path="/cinemate" element={<CineMate/>}/>
          <Route path="/quotes" element={<Quotes/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
