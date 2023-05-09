import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Our project" />
      <h1 className="app__header-h1">The Winx</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>Bienvenue sur notre site de vote ! Exprimez votre choix et faites entendre votre voix lors de nos élections transparentes et équitables.
</p>
      <button type="button" className="custom__button">Explore our Team </button>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header_img" />
    </div>
  </div>
);

export default Header;
