const { assert } = require("chai");

const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    let votingInstance;

    accounts.forEach(account => console.log(account))

    beforeEach(async () => {
        votingInstance = await Voting.deployed();
    });

    it("getProposals should return an empty array", async() => {
        var length = await votingInstance.getProposals.call();
        length = length.length;
        assert.equal(length, 0);
    });

    it("should not allow voting before proposals registration has ended", async function () {
        await votingInstance.startProposalsRegistration();
    
        try {
            await votingInstance.startVotingSession();
            assert.fail("Expected an error to be thrown");
        } catch (error) {
            assert.equal(error.reason, "La session de vote ne peut pas commencer pour le moment");
            await votingInstance.endProposalsRegistration();
        }
    });

    it("should add proposals to the array", async() => {
        await votingInstance.startProposalsRegistration();
        await votingInstance.registerProposal("Proposal 1");
        await votingInstance.registerProposal("Proposal 2");
        const long = await votingInstance.getProposals();
        assert.equal(long.length, 2);
    })
});

