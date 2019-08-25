const truffleAssert = require("truffle-assertions");
const Aster = artifacts.require("./Aster");
const Campaign = artifacts.require("./Campaign");
const expectRevert = require("openzeppelin-test-helpers").expectRevert;
const time = require("openzeppelin-test-helpers").time;
const BN = web3.utils.BN;

let successfulCampaignAddress;
let partialCampaignAddress;
let campaignTitle = "Dog food";
let campaignDescription = "Give me the dog food!";

contract("Aster create", accounts => {
  let aster;

  before(async () => {
    aster = await Aster.deployed();
  });

  const createCampaign = () => {
    return new Promise((resolve, reject) => {
      aster
        .startCampaign(campaignTitle, campaignDescription, 2, 3, 3, 1000000, {
          from: accounts[0]
        })
        .then(async result => {
          const allProjects = await aster.getCampaigns();
          truffleAssert.eventEmitted(result, "CampaignStarted", ev => {
            resolve(ev.contractAddress);
            return allProjects.indexOf(ev.contractAddress) !== -1;
          });
        });
    });
  };

  it("should allow creation of a new Campaign from account 0 and return the campaign (for the successful campaign)", () => {
    createCampaign().then(result => {
      return (successfulCampaignAddress = result);
    });
  });

  it("should allow creation of a new Campaign from account 0 and return the campaign (for the partially funded campaign)", async () => {
    createCampaign().then(result => {
      return (partialCampaignAddress = result);
    });
  });
});

contract("Campaign (successful)", accounts => {
  let campaignInstance;

  before(async () => {
    while (!successfulCampaignAddress)
      await new Promise(resolve => setTimeout(resolve, 1000));
    campaignInstance = await Campaign.at(successfulCampaignAddress);
  });

  it("should allow contributions from account 1", () =>
    campaignInstance
      .contribute({ from: accounts[1], value: 300000 })
      .then(result => truffleAssert.eventEmitted(result, "FundingReceived")));

  it("should return the correct project details", () =>
    campaignInstance.getProperties().then(result => {
      assert.equal(
        result._state.toNumber(),
        0,
        "Project state should be still raising"
      );
      assert.equal(
        result._title,
        campaignTitle,
        "Project title returned incorrect."
      );
    }));

  it("should deny contributions that are too small", () => {
    return expectRevert(
      campaignInstance.contribute({ from: accounts[2], value: 10 }),
      "revert"
    );
  });

  it("should allow contributions from account 2", () =>
    campaignInstance
      .contribute({ from: accounts[2], value: 300000 })
      .then(result => truffleAssert.eventEmitted(result, "FundingReceived")));

  it("should allow contributions from account 3", () =>
    campaignInstance
      .contribute({ from: accounts[3], value: 300000 })
      .then(result => truffleAssert.eventEmitted(result, "FundingReceived")));

  it("should allow contributions from account 4", () =>
    campaignInstance
      .contribute({ from: accounts[4], value: 100000 })
      .then(result => truffleAssert.eventEmitted(result, "FundingReceived")));

  it("should return funded after contributions from several accounts", () =>
    campaignInstance.getProperties().then(result => {
      assert.equal(
        result._state.toNumber(),
        1,
        "Project state should be funded"
      );
    }));

  it("should allow account 1 to vote", () =>
    campaignInstance.vote({ from: accounts[1] }));

  it("should not allow account 5 to vote", () =>
    expectRevert(campaignInstance.vote({ from: accounts[5] }), "revert"));

  it("should not allow account 1 to vote twice in the same stage", () =>
    expectRevert(campaignInstance.vote({ from: accounts[1] }), "revert"));

  it("should allow account 2 to vote, and pay out as this vote should tip the balance", async () => {
    const expectedBalance = new BN(await web3.eth.getBalance(accounts[0])).add(
      new BN(500000)
    );
    await campaignInstance
      .vote({ from: accounts[2] })
      .then(result => truffleAssert.eventEmitted(result, "CreatorPaidStage"));
    return assert.equal(
      await web3.eth.getBalance(accounts[0]),
      expectedBalance
    );
  });

  it("should allow account 1 to vote in the next stage", () => {
    return campaignInstance.vote({ from: accounts[1] });
  });

  it("should allow account 2 to a second time, and pay out as this vote should tip the balance", async () => {
    const expectedBalance = new BN(await web3.eth.getBalance(accounts[0])).add(
      new BN(500000)
    );
    await campaignInstance
      .vote({ from: accounts[3] })
      .then(result => truffleAssert.eventEmitted(result, "CreatorPaidStage"));
    return assert.equal(
      await web3.eth.getBalance(accounts[0]),
      expectedBalance
    );
  });

  it("should return successful after paying out twice", () =>
    campaignInstance.getProperties().then(result => {
      assert.equal(
        result._state.toNumber(),
        3,
        "Project state should be successful"
      );
    }));
});

contract("Campaign (raised and partially refunded)", accounts => {
  let campaignInstance;

  before(async () => {
    while (!partialCampaignAddress)
      await new Promise(resolve => setTimeout(resolve, 1000));
    campaignInstance = await Campaign.at(partialCampaignAddress);
  });

  it("should allow contributions from account 1", () =>
    campaignInstance
      .contribute({ from: accounts[1], value: 300000 })
      .then(result => truffleAssert.eventEmitted(result, "FundingReceived")));
});
/*
 * Other tests are needed for:
 * - Raised but not enough votes in given time and thus timed out, and thus refunded.
 * - Failed to raise and thus refunded.
 * - All possible state transitions
 *
 * Additional tests/fuzzing and an audit needed before mainnet usage.
 * */
