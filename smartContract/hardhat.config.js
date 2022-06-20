// require("@nomiclabs/hardhat-waffle");


// require('nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: '0.8.15',
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts:
        process.env.PRIVATE_KEY,
    },
  },
};













// module.exports = {
//   solidity: '0.8.15',
//   networks: {
//     mumbai: {
//       url: "https://eth-rinkeby.alchemyapi.io/v2/2ts34AJX4z7C2pEn6yTACemGWC7tYFuz",
//       accounts: process.env.PRIVATE_KEY,
//     },
//   },
// }

  