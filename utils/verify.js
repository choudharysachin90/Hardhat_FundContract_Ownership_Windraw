const { run } = require("hardhat");

async function verify(contractAddress, args) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.includes("already verified")) {
      console.log("contract already verfied");
    } else {
      console.log(e);
    }
  }
}
