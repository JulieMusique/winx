import React from "react";
import { FindUs, Footer, Gallery, Header,  Laurels} from './container';
import { Navbar } from './components';
import './App.css';
import { Newsletter } from './components';

const App = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Gallery />
      <Newsletter />
      <FindUs />
      <Laurels />
      <Footer />
    </div>
  );
}

export default App;
