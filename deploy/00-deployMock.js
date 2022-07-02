const { network, hre } = require("hardhat");
const {
  DEVELOPMENT_ENVIRONMENT,
  DECIMAL_UNIT,
  TOTAL_VALUE,
} = require("../hardhat-helper-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (DEVELOPMENT_ENVIRONMENT.includes(network.name)) {
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      args: [DECIMAL_UNIT, TOTAL_VALUE],
      log: true,
    });
  }

  log("Mock deployes successfully ..");
  log("================================================================");
};

module.exports.tags = ["all", "mock"];
