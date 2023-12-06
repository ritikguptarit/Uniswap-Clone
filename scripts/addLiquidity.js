// Token addresses
mysticAddress= "0x30426D33a78afdb8788597D5BFaBdADc3Be95698";
symphonyAddrss= "0x85495222Fd7069B987Ca38C2142732EbBFb7175D";
popUpAddress= "0x3abBB0D6ad848d64c8956edC9Bf6f18aC22E1485";
MIS_FITS= "0xEc3f6A10F49F56C28C3B2E561B1CD2D093E3601a";
// Uniswap contract address
wethAddress= "0x021DBfF4A864Aa25c51F0ad2Cd73266Fde66199d";
factoryAddress= "0x4CF4dd3f71B67a7622ac250f8b10d266Dc5aEbcE";
swapRouterAddress= "0x2498e8059929e18e2a2cED4e32ef145fa2F4a744";
nftDescriptorAddress= "0x447786d977Ea11Ad0600E193b2d07A06EfB53e5F";
positionDescriptorAddress= "0x6DcBc91229d812910b54dF91b5c2b592572CD6B0";
positionManagerAddress= "0x245e77E56b1514D77910c9303e4b44dDb44B788c";

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Mystic: require("../artifacts/contracts/Mystic.sol/Mystic.json"),
  Symphony: require("../artifacts/contracts/Symphony.sol/Symphony.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

const { Contract } = require("ethers");
const { Token } = require("@uniswap/sdk-core");
const { Pool, Position, nearestUsableTick } = require("@uniswap/v3-sdk");

async function getPoolData(poolContract) {
  const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  console.log(tickSpacing, fee, liquidity, slot0);
  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  };
}

async function main() {
  const [owner,signer2]=await ethers.getSigners();
  const provider = waffle.provider;
 

  const MysticContract = new Contract(
    mysticAddress,
    artifacts.Mystic.abi,
    provider
  );
  const SymphonyContract = new Contract(
    symphonyAddrss,
    artifacts.Symphony.abi,
    provider
  );

  await MysticContract.connect(signer2).approve(
    positionManagerAddress,
    ethers.utils.parseEther("1000")
  );
  await SymphonyContract.connect(signer2).approve(
    positionManagerAddress,
    ethers.utils.parseEther("1000")
  );

  const poolContract = new Contract(
    MIS_FITS,
    artifacts.UniswapV3Pool.abi,
    provider
  );

  const poolData = await getPoolData(poolContract);

  const MysticToken = new Token(31337, mysticAddress, 18, "Mystic", "MYST");
  const SymphonyToken = new Token(31337, symphonyAddrss, 18, "Symphony", "SYMPH");

  const pool = new Pool(
    MysticToken,
    SymphonyToken,
    poolData.fee,
    poolData.sqrtPriceX96.toString(),
    poolData.liquidity.toString(),
    poolData.tick
  );

  const position = new Position({
    pool: pool,
    liquidity: ethers.utils.parseEther("1"),
    tickLower:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) -
      poolData.tickSpacing * 2,
    tickUpper:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) +
      poolData.tickSpacing * 2,
  });
  console.log(position);
  const { amount0: amount0Desired, amount1: amount1Desired } =
    position.mintAmounts;

  params = {
    token0: mysticAddress,
    token1: symphonyAddrss,
    fee: poolData.fee,
    tickLower:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) -
      poolData.tickSpacing * 2,
    tickUpper:
      nearestUsableTick(poolData.tick, poolData.tickSpacing) +
      poolData.tickSpacing * 2,
    amount0Desired: amount0Desired.toString(),
    amount1Desired: amount1Desired.toString(),
    amount0Min: 0,
    amount1Min: 0,
    recipient: signer2.address,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10,
  };

  const nonfungiblePositionManager = new Contract(
    positionManagerAddress,
    artifacts.NonfungiblePositionManager.abi,
    provider
  );

  const tx = await nonfungiblePositionManager
    .connect(signer2)
    .mint(params, { gasLimit: "1000000" });
  const receipt = await tx.wait();
  console.log(receipt);
}

/*
  npx hardhat run --network localhost scripts/addLiquidity.js
  */

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
