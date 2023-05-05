// ./client/src/App.js
import React, { Component } from "react"
import Voting from "./contracts/Voting.json"
import getWeb3 from "./getWeb3"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import './App.css'

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    userAddress: null,
    isOwner: false,
    proposals: null,
    description : null,
    winningProposal: null
  }

  // componentDidMount : méthode qui permet de lancer une fonction au moment ou app.js est instancié, si la page se lance bien elle envoie componentDidMount

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      /* on récupère le tableau des comptes sur le metamask du user */
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = Voting.networks[networkId]
      console.log("deployedNetwork", deployedNetwork)
      /* Création de l'objet de contrat avec l'abi, le deployedNetwork et son address  */
      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address
      )

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance })

      if (accounts && accounts.length > 0) {
        let account = accounts[0]
        this.setState({
          userAddress: account.slice(0, 6) + "..." + account.slice(38, 42),
        })
        // Check if the user is the owner
        console.log(instance);
        const owner = await instance.methods.owner().call()
        if (account === owner) {
          this.setState({
            isOwner: true,
          })
          const status = await instance.methods.getStatus().call()
          console.log(status)
          const response = await instance.methods.startProposalsRegistration().send({ from: account, gas:"5000000"})
          console.log(response)
        }
        const proposal = await instance.methods.getProposals().call()
        this.setState({proposals: proposal})
        console.log(proposal)
      } else {
        console.error("No accounts found")
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.error(error)
    }
  }

  runProposals = async () => {
    // Get the value from the contract to prove it worked.
    const response = await this.state.contract.methods.getProposals().call();
    console.log(response)
    // Update state with the result.
    this.setState({proposals: response})
  };

  handleSubmit = async() => {
    //alert("owner addr",this.state.isOwner)
    console.log("owner addr",this.state.isOwner)
    //await this.state.contract.methods.startProposalsRegistration().call({ from: this.state.accounts[0] })
    console.log(this.state.description)
    await this.state.contract.methods.registerProposal(this.state.description).send({from : this.state.accounts[0], gas:"5000000"})
    await this.runProposals()
    console.log(this.state.proposals)
  }

  handleStartProposal = async() => {
    const response = await this.state.contract.methods.startProposalsRegistration().send({ from: this.state.accounts[0], gas:"5000000"})
    console.log(response)
    const status = await this.state.contract.methods.getStatus().call()
    console.log(status)
  }

  handleEndProposal = async() => {
    const response = await this.state.contract.methods.endProposalsRegistration().send({ from: this.state.accounts[0], gas:"5000000"})
    console.log(response)
    const status = await this.state.contract.methods.getStatus().call()
    console.log(status)
  }

  handleStartVotingSession = async() => {
    const response = await this.state.contract.methods.startVotingSession().send({ from: this.state.accounts[0], gas:"5000000"})
    console.log(response)
    const status = await this.state.contract.methods.getStatus().call()
    console.log(status)
  }

  handleEndVotingSession = async() => {
    const response = await this.state.contract.methods.endVotingSession().send({ from: this.state.accounts[0], gas:"5000000"})
    console.log(response)
    const status = await this.state.contract.methods.getStatus().call()
    console.log(status)
  }

  handletallyVote = async() => {
    const responseid = await this.state.contract.methods.tallyVotes().send({ from: this.state.accounts[0], gas:"5000000"})
    this.setState({winningProposal: await this.state.contract.methods.getProposals()[responseid]})
    console.log(this.state.winningProposal)
    const status = await this.state.contract.methods.getStatus().call()
    console.log(status)
  }

render() {
return (
      <div className="App">
        <div className="flex flex-col justify-between min-h-screen">
          <div className="flex-1">
            <header>
              <nav className="bg-yellow-10 border-yellow-30  z-50 fixed w-full">
                <div className="sm:px-6 sm:py-3 md:px-8 md:py-6 flex flex-row items-center justify-between border border-b">
                  <div className="flex flex-row items-center">
                    <a className="logo md:w-170 w-80" href="/">
                      Vote DApp
                    </a>
                  </div>
                  <div className="flex">
                    <button className="p-1 block md:hidden">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="h-8 w-auto"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                      </svg>
                    </button>
                  </div>
                  <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
                    <li>
                      <button
                        id="web3-status-connected"
                        className="web3-button"
                      >
                        <p className="Web3StatusText">
                          {this.state.userAddress}
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
                </div>
              </nav>
            </header>
            </div>
            </div>
            <div className="affiche">
              <img className="affiche-img" src="./static/images/images.jpg" alt="img"/>
              <h1>Bienvenue !</h1>
              <p>{this.state.proposals.map((items, index) => (
                <Button key={index} href={items[2]} sx={{ color: '#000' }}>
                  {items[0]}{items[1]}
                </Button>
              ))}</p>
              <TextField id="outlined-bare" placeholder="Description du proposal" margin="normal" onChange={ (e) => this.setState({description: e.target.value}) } variant="outlined" inputProps={{ 'aria-label': 'bare' }} />
              <Button onClick={this.handleSubmit} variant="contained">
                  Submit
              </Button>
              <Button onClick={this.handleStartProposal} variant="contained">
                  Start Proposal
              </Button>
              <Button onClick={this.handleEndProposal} variant="contained">
                  End proposal
              </Button>
              <Button onClick={this.handleStartVotingSession} variant="contained">
                  start voting session
              </Button>
              <Button onClick={this.handleEndVotingSession} variant="contained">
                  End voting session
              </Button>
              <Button onClick={this.handletallyVote} variant="contained">
                  Winning Proposal 
              </Button>
            </div>
            </div>
)
}
}
export default App;