import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import { AboutUs } from '../';
const FindUs = () => (
  <><div className="app__bg app__wrapper section__padding" id="contact">
    <div className="app__wrapper_info">
      <SubHeading title="Voting" />
      <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Participez au vote
      </h1>
      <div className="app__wrapper-content">
        <p className="p__opensans">N'oubliez pas de participer à la décision en votant dès maintenant !
        </p>

      </div>
      <button type="button" className="custom__button" style={{ marginTop: '2rem' }}>Votez ici</button>
    </div>

    <div className="app__wrapper_img">
      <img src={images.findus} alt="finus_img" />
    </div>


    </div></>
);

export default FindUs;
