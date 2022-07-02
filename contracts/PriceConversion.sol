// SPDX-License-Identifier : MIT

pragma solidity ^0.8.0;

//Import npm package for chainlink to work with oracle to get live eth price
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

//Library creation -> All functions should be internal. Can have state variable and can send ether

library PriceConvertor {
    function getPrice(AggregatorV3Interface priceFeed)
        internal
        returns (uint256)
    {
        //When you call external contract's function , you need two things
        // ABI
        // Address
        // Rinkeby adress to use with rinkeby testnet . 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e

        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getConversionRate(
        uint256 ethAmountInWei,
        AggregatorV3Interface pricefeed
    ) internal returns (uint256) {
        uint256 priceOfOneEthInUSD = getPrice(pricefeed);
        return (priceOfOneEthInUSD * ethAmountInWei) / 1e18;
    }
}
