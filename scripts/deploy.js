
const hre = require("hardhat");

async function main() {
//asv token

  /*const AsvToken = await hre.ethers.getContractFactory("AsvToken");
  const asvToken = await AsvToken.deploy();

  await asvToken.deployed();

  console.log(
    ` Asv deployed to ${asvToken.address}`
  );

  //Ritik token

const RitikToken = await hre.ethers.getContractFactory("RitikToken");
const ritikToken = await RitikToken.deploy();

await ritikToken.deployed();

console.log(
  ` Ritik deployed to ${ritikToken.address}`
);*/

//single swap token

const SingleSwapToken = await hre.ethers.getContractFactory("SingleSwapToken");
const singleSwapToken = await SingleSwapToken.deploy();

await singleSwapToken.deployed();

console.log(
  ` SingleSwapToken deployed to ${singleSwapToken.address}`
);

//multi swap

const SwapMultiHop = await hre.ethers.getContractFactory("SwapMultiHop");
const swapMultiHop = await SwapMultiHop.deploy();

await swapMultiHop.deployed();

console.log(
  ` swapMultiHop deployed to ${swapMultiHop.address}`
);
//USER DATA CONTRACT
const UserStorageData = await hre.ethers.getContractFactory(
  "UserStorageData"
);
const userStorageData = await UserStorageData.deploy();
await userStorageData.deployed();
console.log(`UserStorageData deployed to ${userStorageData.address}`);
}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
