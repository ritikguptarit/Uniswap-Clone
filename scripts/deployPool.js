// Token addresses
mysticAddress= "0x4CF4dd3f71B67a7622ac250f8b10d266Dc5aEbcE";
symphonyAddrss= "0x2498e8059929e18e2a2cED4e32ef145fa2F4a744";
popUpAddress= "0x447786d977Ea11Ad0600E193b2d07A06EfB53e5F";

// Uniswap contract address
wethAddress= "0x6DcBc91229d812910b54dF91b5c2b592572CD6B0";
factoryAddress= "0x245e77E56b1514D77910c9303e4b44dDb44B788c";
swapRouterAddress= "0xE2b5bDE7e80f89975f7229d78aD9259b2723d11F";
nftDescriptorAddress= "0xC6c5Ab5039373b0CBa7d0116d9ba7fb9831C3f42";
positionDescriptorAddress= "0x4ea0Be853219be8C9cE27200Bdeee36881612FF2";
positionManagerAddress= "0x46d4674578a2daBbD0CEAB0500c6c7867999db34";

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
};

// const { waffle } = require("hardhat");
const { Contract, BigNumber } = require("ethers");
const bn = require("bignumber.js");
const Web3Modal = require("web3modal");
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

const MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/Vbp3uWYp0yXyRxG0AkQalwP6ZbVavQ9n";

const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL);

function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .integerValue(3)
      .toString()
  );
}

const nonfungiblePositionManager = new Contract(
  positionManagerAddress,
  artifacts.NonfungiblePositionManager.abi,
  provider
);

const factory = new Contract(
  factoryAddress,
  artifacts.UniswapV3Factory.abi,
  provider
);

async function deployPool(token0, token1, fee, price) {
   const [owner] = await ethers.getSigners();
  await nonfungiblePositionManager
    .connect(owner)
    .createAndInitializePoolIfNecessary(token0, token1, fee, price, {
      gasLimit: 5000000,
    });

  
  const poolAddress = await factory
    .connect(owner)
    .getPool(token0, token1, fee);
  return poolAddress;
}

async function main() {
  const misFits = await deployPool(
   mysticAddress,
  symphonyAddrss,
    500,
    encodePriceSqrt(1, 1)
  );

  console.log("MIS_FITS=", `'${misFits}'`);
}

/*
  npx hardhat run --network localhost scripts/deployPool.js
  */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
