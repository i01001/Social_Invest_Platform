const hre = require("hardhat");
require("@nomiclabs/hardhat-waffle");

const main = async () => {
    const sTPlatformFactory = await ethers.getContractFactory("STPlatform")
    const STPlatformContract = await sTPlatformFactory.deploy()
  
    await STPlatformContract.deployed()
  
    console.log('Social Trading Platform deployed to:', STPlatformContract.address)
  }
  
  ;(async () => {
    try {
      await main()
      process.exit(0)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  })()