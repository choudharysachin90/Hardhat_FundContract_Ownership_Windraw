//Get the fund from user.
//Withdraw fund
//Set a minimum funding value

// SPDX-License-Identifier : MIT

pragma solidity ^0.8.4;

import "./PriceConversion.sol"; // import a library

contract FundMe {
    using PriceConvertor for uint256; // Use a library on top of uint256 type

    address private owner;
    uint256 private constant minimunAmount = 10 * 1e18;
    address[] public funders;
    mapping(address => uint256) public adressToAmountFunded;

    AggregatorV3Interface private priceFeed;

    //Set minimun limit
    // Send eth to contract

    constructor(address priceFeedAddress) {
        // assign contract creator as Owner of contract
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function Fund() public payable {
        // send at least 100 USD   //msg.value.getConversionRate() is defined in library
        require(
            msg.value.getConversionRate(priceFeed) > minimunAmount,
            "You can't send less than 10 USD"
        );
        funders.push(msg.sender);
        adressToAmountFunded[msg.sender] = msg.value;
    }

    // Modifier help modify a function to check a orecondition before executing code of a function
    modifier OnlyOwner() {
        require(msg.sender == owner, "Only owner can call this funstion");
        _;
    }

    function Withdraw() public OnlyOwner {
        for (uint256 index = 0; index < funders.length; index = index + 1) {
            address funder = funders[index];
            adressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);

        (bool callstatus, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callstatus == true, "withdrawn failed");
    }

    //special solidity function in case someone send eth to this contract using metamask and contract address or something
    receive() external payable {
        Fund();
    }

    //special solidity function in case someone send eth to this contract using metamask and contract address or something
    fallback() external payable {
        Fund();
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getMinimumAmount() public pure returns (uint256) {
        return minimunAmount;
    }

    function getPricefeedAddress() public view returns (AggregatorV3Interface) {
        return priceFeed;
    }
}
