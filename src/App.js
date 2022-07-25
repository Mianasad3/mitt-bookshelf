// import logo from './logo.svg';
// import './App.css';
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Search from "./pages/Search";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
