import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../../constants/images';
import './Navbar.css';
import { Chef } from '../../container';
import { BsCheckCircleFill } from 'react-icons/bs';
const Navbar = () => {
  const Cheffe = new Chef();
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.gericht} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><a href="#home">Home</a></li>
        <li className="p__opensans"><a href="#gallery">Team</a></li>
        <li className="p__opensans"><a href="#propose">Proposals</a></li>
        <li className="p__opensans"><a href="#awards">Results</a></li>
        <li className="p__opensans"><a href="#contact">Voting</a></li>
      </ul>
      <div className="app__navbar-login">
      <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
                    <li>
      <button
          id="web3-status-connected"
           className="web3-button"
                      >
                        <p className="Web3StatusText">
                          {Cheffe.state.userAddress}
                        </p>
                        <div
                          size="16"
                          className="Web3Status__IconWrapper-sc-wwio5h-0 hqHdeW"
                        >
                          <div className="Identicon__StyledIdenticon-sc-1ssoit4-0 kTWLky">
                            <span>
                              <div className="avatar">
                                <svg x="0" y="0" width="16" height="16">
                                  <rect
                                    x="0"
                                    y="0"
                                    width="16"
                                    height="16"
                                    transform="translate(-1.1699893080448718 -1.5622487594391614) rotate(255.7 8 8)"
                                    fill="#2379E1"
                                  ></rect>
                                  <rect
                                    x="0"
                                    y="0"
                                    width="16"
                                    height="16"
                                    transform="translate(4.4919645360147475 7.910549295855059) rotate(162.8 8 8)"
                                    fill="#03595E"
                                  ></rect>
                                  <rect
                                    x="0"
                                    y="0"
                                    width="16"
                                    height="16"
                                    transform="translate(11.87141302372359 2.1728091065947037) rotate(44.1 8 8)"
                                    fill="#FB1877"
                                  ></rect>
                                </svg>
                              </div>
                            </span>
                          </div>
                        </div>
                      </button>
                      </li>
                  </ul>
        <div />
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#gallery" onClick={() => setToggleMenu(false)}>Team</a></li>
              <li><a href="#propose" onClick={() => setToggleMenu(false)}>Proposals</a></li>
              <li><a href="#awards" onClick={() => setToggleMenu(false)}>Results</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Voting</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
