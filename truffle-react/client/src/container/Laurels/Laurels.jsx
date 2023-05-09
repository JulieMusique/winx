import React, { useState, useEffect } from 'react';
import { SubHeading } from '../../components';
import {  images,data } from '../../constants';
import './Laurels.css';
import Web3 from 'web3';
import Voting from '../../contracts/Voting.json';

const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
  <div className="app__laurels_awards-card">
    <img src={imgUrl} alt="awards" />
    <div className="app__laurels_awards-card_content">
      <p className="p__cormorant" style={{ color: '#DCCA87' }}>{title}</p>
      <p className="p__opensans">{subtitle}</p>
    </div>
  </div>
);

const Laurels = () => {
  const [winningProposal, setWinningProposal] = useState('');

  useEffect(() => {
    async function fetchWinningProposal() {
      const web3 = new Web3(Web3.givenProvider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const votingInstance = new web3.eth.Contract(Voting.abi, deployedNetwork.address);

      const winningProposalId = await votingInstance.methods.tallyVotes().call();
      const winningProposalDescription = await votingInstance.methods.proposals(winningProposalId).description().call();

      setWinningProposal(winningProposalDescription);
    }
    fetchWinningProposal();
  }, []);

  return (
    <div className="app__bg app__wrapper section__padding" id="awards">
    <div className="app__wrapper_info">
      <SubHeading title="Results" />

      <div className="app__laurels_awards">
        {data.awards.map((award) => <AwardCard award={award} key={award.title} />)}
      </div>
    </div>

    <div className="app__wrapper_img">
      <img src={images.laurels} alt="laurels_img" />
    </div>
  </div>
  );
};

export default Laurels;