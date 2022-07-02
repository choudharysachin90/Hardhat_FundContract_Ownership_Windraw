/* async function deployFund(hre) {
  console.log("Deploy Fund me contract");
  const getnameAccounts = hre.getNameAccounts;
  const deployments = hre.deployments;

}

module.exports = deployFund; */

const { network, ethers } = require("hardhat");
const {
  DEVELOPMENT_ENVIRONMENT,
  NetwrokConfig,
} = require("../hardhat-helper-config");
const { verify } = require("../hardhat.config");

/* module.exports = async (hre) => {
  const { getNameAccounts, deployments } = hre;
  console.log(deployments);
}; */

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  let priceFeedAddress;
  if (DEVELOPMENT_ENVIRONMENT.includes(network.name)) {
    const mockAddressContract = await deployments.get("MockV3Aggregator");
    priceFeedAddress = mockAddressContract.address;
  } else {
    priceFeedAddress =
      NetwrokConfig[network.config.chainId]["ethUSDPriceAddress"];
  }

  const args = [priceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
  });

  if (!DEVELOPMENT_ENVIRONMENT.includes(network.name)) {
    await verify(fundMe.address, args);
  }
};

module.exports.tags = ["all", "FundMe"];
