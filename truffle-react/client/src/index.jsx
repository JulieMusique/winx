import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawerAppBar from './components/NavBar/index';
//import App from './App';
import Home from './components/Home/index';
import Groupe from './components/Home/groupe';
import Projet from './components/Home/projet';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <DrawerAppBar />
      <Routes>
        <Route path='/' exact element={<App />}></Route>
        <Route path='/voter' exact element={<Home />}></Route>
        <Route path='/groupe' exact element={<Groupe />}></Route>
        <Route path='/projet' exact element={<Projet />}></Route>
      </Routes>
    </Router>
  </>
);
