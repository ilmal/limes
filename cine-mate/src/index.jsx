import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import Landing from './pages/landing';
import Header from './pages/header'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Landing />

  </React.StrictMode>
);
