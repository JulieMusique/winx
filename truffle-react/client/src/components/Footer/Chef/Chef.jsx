import React, { Component } from "react";
import { SubHeading } from "../..";
import { images } from "../../../constants";
import "./Chef.css";
import getWeb3 from "../getWeb3";
import VotingContract from "../../../contracts/Voting.json";

class Chef extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    userAddress: null,
    isOwner: false,
  };

  async componentDidMount() {
    try {
      // Récupération de l'instance web3
      const web3 = await getWeb3();
      this.setState({ web3 });

      // Récupération du premier compte associé à l'instance web3
      const accounts = await web3.eth.getAccounts();
      this.setState({ accounts });

      // Récupération de l'adresse du contrat à partir du fichier JSON
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      this.setState({ contract: instance });

      // Vérification si l'utilisateur courant est le propriétaire
      const userAddress = accounts[0];
      const owner = await instance.methods.owner().call();
      const isOwner = owner === userAddress;
      this.setState({ userAddress, isOwner });
    } catch (error) {
      // Gestion des erreurs
      console.error("Error during web3 initialization", error);
    }
  }

  async startSessionVote() {
    try {
      const { contract } = this.state;
      await contract.methods.startSessionVote().send({ from: this.state.accounts[0] });
    } catch (error) {
      console.error("Error during startSessionVote call", error);
    }
  }

  render() {
    const { proposals } = this.props;
    const { userAddress, isOwner } = this.state;
  
    return (
      <div className="app__bg app__wrapper section__padding">
        <div className="app__wrapper_img app__wrapper_img-reverse">
          <img src={images.quote} alt="chef_image" />
        </div>
        <div className="app__wrapper_info">
          <SubHeading title="Proposals" />
          <h1 className="headtext__cormorant">List of proposals</h1>
  
          <div className="app__chef-content">
  {proposals.map((proposal, index) => (
    <div key={index} className="app__chef-content_quote">
      <p className="p__opensans">{proposal}</p>
    </div>
  ))}
</div>

  
          {isOwner && (
            <button onClick={() => this.startSessionVote()}>Start Vote Session</button>
          )}
  
          <p>{`Connected with address: ${userAddress}`}</p>
        </div>
      </div>
    );
  }
  
}

export default Chef;

