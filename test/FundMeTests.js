const { assert, expect } = require("chai");
const { formatUnits } = require("ethers/lib/utils");
const { ethers, deployments, getNamedAccounts } = require("hardhat");

describe("Unit Tests", async () => {
  let fundMeContract, deployerAcount, MockV3Contract;
  const sendValue = ethers.utils.parseEther("0.1");
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    console.log(accounts[0].address);
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);

    fundMeContract = await ethers.getContract("FundMe", deployer);
    MockV3Contract = await ethers.getContract("MockV3Aggregator", deployer);
    console.log(fundMeContract.address);
    console.log(deployer);
    console.log(MockV3Contract.address);
  });

  it("Test Constructor", async () => {
    const deplorBalance = await ethers.provider.getBalance(deployer);
    console.log(deplorBalance.toString());
    const contractBalance = await ethers.provider.getBalance(
      fundMeContract.address
    );
    console.log(contractBalance.toString());

    const owner = await fundMeContract.getOwner();
    //assert.equal(fundMeContract.address, await fundMeContract.getOwner());
    console.log(owner);

    assert.equal(deployer, await fundMeContract.getOwner());
    assert.equal(
      MockV3Contract.address,
      await fundMeContract.getPricefeedAddress()
    );
  });

  it("Transaction revert if not enought ether sent", async () => {
    //const ts = await fundMeContract.Fund();

    await expect(fundMeContract.Fund()).to.be.revertedWith(
      "You can't send less than 10 USD"
    );
  });

  it("Fund contract and check balance and array value", async () => {
    await fundMeContract.Fund({ value: sendValue });

    const contractBalanceApproachSecond = await ethers.provider.getBalance(
      fundMeContract.address
    );
    console.log(`second approach : ${contractBalanceApproachSecond}`);
    const arrayValue = await fundMeContract.funders(0);
    const valueinMapping = await fundMeContract.adressToAmountFunded(
      arrayValue
    );
    assert.equal(arrayValue, deployer);
    const valueInEther = ethers.utils.formatUnits(valueinMapping, "ether");

    console.log(`value in ether :${valueinMapping}`);
    console.log(`Send value in ether :${sendValue}`);
    assert.equal(valueinMapping.toString(), sendValue.toString());
    console.log(`address in array is :${arrayValue}`);
    console.log(`value for that address in mapping is :${valueinMapping}`);
  });
});
