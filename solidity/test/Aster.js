const truffleAssert = require("truffle-assertions");
const Aster = artifacts.require("./Aster");
const Campaign = artifacts.require("./Campaign");
const expectRevert = require("openzeppelin-test-helpers").expectRevert;
let campaignAddress;
let campaignTitle = "Dog food";
let campaignDescription = "Give me the dog food!";

contract("Aster", accounts => {
  it("should allow creation of a new Campaign from account 0 and return the campaign", () => {
    Aster.deployed()
      .then(instance =>
        instance.startCampaign(
          campaignTitle,
          campaignDescription,
          2,
          3,
          3,
          1000000,
          { from: accounts[0] }
        )
      )
      .then(async result => {
        allProjects = await Aster.deployed().then(instance =>
          instance.getCampaigns()
        );
        truffleAssert.eventEmitted(result, "CampaignStarted", ev => {
          campaignAddress = ev.contractAddress;
          return ev.contractAddress === allProjects[0];
        });
      });
  });
});

contract("Campaign", accounts => {
  let campaignInstance;

  before(async () => {
    while (!campaignAddress)
      await new Promise(resolve => setTimeout(resolve, 1000));
    campaignInstance = await Campaign.at(campaignAddress);
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

  it("should allow account 2 to vote", () =>
    campaignInstance
      .vote({ from: accounts[2] })
      .then(result => truffleAssert.eventEmitted(result, "CreatorPaid")));

  it("should allow account 1 to vote in the next stage", () =>
    campaignInstance.vote({ from: accounts[1] }));
});
