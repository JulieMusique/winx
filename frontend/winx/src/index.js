import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DrawerAppBar from './Components/NavBar';
import App from './App';
import Home from './Components/Home/index';
import Groupe from './Components/Home/groupe';
import Projet from './Components/Home/projet';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <DrawerAppBar />
      <Routes>
        <Route path='/' exact element={<App />}></Route>
        <Route path='/voter' exact element={<Home />}></Route>
        <Route path='/groupe' exact element={<Groupe />}></Route>
        <Route path='/projet' exact element={<Projet />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
