// src/App.js
import React from 'react';
import './App.css';
import MovieSearch from './component/MovieSearch';
import {Header} from "./component/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <MovieSearch />
    </div>
  );
}

export default App;
