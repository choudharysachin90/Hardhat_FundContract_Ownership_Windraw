const NetwrokConfig = {
  4: {
    name: "Rinkeby",
    ethUSDPriceAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
  137: {
    name: "Polygon",
    ethUSDPriceAddress: "",
  },
};

const DEVELOPMENT_ENVIRONMENT = ["hardhat", "localhost"];

const DECIMAL_UNIT = 8;
const TOTAL_VALUE = 300000000000;

module.exports = {
  NetwrokConfig,
  DECIMAL_UNIT,
  TOTAL_VALUE,
  DEVELOPMENT_ENVIRONMENT,
};
