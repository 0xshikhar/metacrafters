const hre = require("hardhat");

async function main() {
    const CounterContractFactory = await hre.ethers.getContractFactory("Counter");
    const counterContract = await CounterContractFactory.deploy();

    await counterContract.deployed();

    console.log(
        `Counter contract address : ${counterContract.address}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 

