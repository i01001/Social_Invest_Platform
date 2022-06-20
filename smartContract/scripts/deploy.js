

const main = async () => {
    const sTPlatformFactory = await hre.ethers.getContractFactory('STPlatform')
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