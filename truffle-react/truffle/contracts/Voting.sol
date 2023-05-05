

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable{

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    uint winningProposalId ;
    WorkflowStatus workflowStatus = WorkflowStatus.RegisteringVoters;

    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function getStatus() public view returns(string memory){
        if(workflowStatus == WorkflowStatus.RegisteringVoters){
            return "RegisteringVoters";
        } else if(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted){
            return "ProposalsRegistrationStarted";
        } else if(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded){
            return "ProposalsRegistrationEnded";
        } else if(workflowStatus == WorkflowStatus.VotingSessionStarted){
            return "VotingSessionStarted";
        } else if(workflowStatus == WorkflowStatus.VotingSessionEnded){
            return "VotingSessionEnded";
        } else if(workflowStatus == WorkflowStatus.VotesTallied){
            return "VotesTallied";
        }
    }

    function registerVoter(address _voterAddress) public onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, "L'enregistrement n'est pas autorise pour le moment");
        require(!voters[_voterAddress].isRegistered, "Le votant est deja inscrit");

        voters[_voterAddress].isRegistered = true;
        emit VoterRegistered(_voterAddress);
    }

    function startProposalsRegistration() public onlyOwner {
        if(workflowStatus != WorkflowStatus.ProposalsRegistrationStarted){
            require(workflowStatus == WorkflowStatus.RegisteringVoters || workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, "L'enregistrement des propositions ne peut pas commencer pour le moment");

            workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
            emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, workflowStatus);
        }
        
    }

    function registerProposal(string memory _description) public {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, "L'enregis des propositions n'est pas autorise pour le moment");

        Proposal memory newProposal = Proposal({
            description: _description,
            voteCount: 0
        });

        proposals.push(newProposal);
        uint proposalId = proposals.length - 1;
        emit ProposalRegistered(proposalId);
    }

    function endProposalsRegistration() public onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, "L'enregis des propos ne peut pas se terminer pour le moment");

        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, workflowStatus);
    }

    function startVotingSession() public onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, "La session de vote ne peut pas commencer pour le moment");

        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, workflowStatus);
    }

    function vote(uint _proposalId) public {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, "Le vote n'est pas autorise pour le moment");
        require(voters[msg.sender].isRegistered, "Le vote n'est pas enregistre");
        require(!voters[msg.sender].hasVoted, "Le votant a deja vote");
        require(_proposalId < proposals.length, "id de proposition non valide");

        proposals[_proposalId].voteCount++;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedProposalId = _proposalId;

        emit Voted(msg.sender, _proposalId);
    }

    function endVotingSession() public onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, "La session de vote ne peut pas se terminer pour le moment");

        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, workflowStatus);
    }

    function tallyVotes() public onlyOwner returns (uint) {
        require(workflowStatus == WorkflowStatus.VotesTallied, "Voting session has not ended yet.");
        uint maxVotes = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > maxVotes) {
                maxVotes = proposals[i].voteCount;
                winningProposalId = i;
            }
        }
        return winningProposalId;
    }

}