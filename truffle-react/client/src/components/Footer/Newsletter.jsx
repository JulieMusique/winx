import React, { Component } from "react"
import SubHeading from '../SubHeading/SubHeading';
import './Newsletter.css';
import { Button, TextField } from "@material-ui/core";
import { Chef} from '../../container';
import getWeb3 from "./getWeb3";


class Newsletter extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    userAddress: null,
    proposals: [],
    description: "",
  };

  async componentDidMount() {
    const web3 = await getWeb3();
    const contract = await this.props.getContractInstance(web3);
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    const proposals = await contract.methods.getProposals().call();

    this.setState({ web3, accounts, contract, userAddress, proposals });
  }

  handleChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleSubmit = async () => {
    const { contract, userAddress, description } = this.state;
    await contract.methods.propose(description).send({ from: userAddress });
    const proposals = await contract.methods.getProposals().call();
    this.setState({ proposals, description: "" });
  };

  render() {
    const { proposals, description } = this.state;

    return (
      <>
        <div className="app__newsletter" id="propose">
          <div className="app__newsletter-heading">
            <SubHeading title="Voting" />
            <h1 className="headtext__cormorant">
              Veuillez proposer vos idées pour contribuer à notre vote
            </h1>
            <p className="p__opensans">Ne manquez pas les résultats</p>
          </div>
          <form className="app__newsletter-input flex__center" onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-bare"
              placeholder="Enter your proposal"
              margin="normal"
              onChange={this.handleChange}
              variant="outlined"
              inputProps={{ "aria-label": "bare" }}
              value={description}
            />
            <Button type="submit" variant="contained">
              Enter
            </Button>
          </form>
        </div>
        <Chef proposals={proposals} />
      </>
    );
  }
}
export default Newsletter;