import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // react-router-domから必要なコンポーネントをインポート
import './index.css';
import Api from './Api';
import Home from './Home';
import TicTacToe from './TicTacToe';
import Todo from './Todo';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <header className="header">
      <img className="header__logo" src="logo512.png" alt="Reactのロゴ" />
      <p className="header__title">React勉強用</p>
    </header>
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<Api />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
