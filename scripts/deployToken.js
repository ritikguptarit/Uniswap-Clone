async function main() {
  const [owner] = await ethers.getSigners();

  Mystic = await ethers.getContractFactory("Mystic");
  mystic = await Mystic.deploy();

  Symphony = await ethers.getContractFactory("Symphony");
  symphony = await Symphony.deploy();

  PopUp = await ethers.getContractFactory("PopUp");
  popUp = await PopUp.deploy();



  console.log("mysticAddress=", `'${mystic.address}'`);
  console.log("symphonyAddrss=", `'${symphony.address}'`);
  console.log("popUpAddress=", `'${popUp.address}'`);
}

/*
  npx hardhat run --network localhost scripts/deployToken.js
  */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
