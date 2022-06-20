// require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-waffle");

// require('nomiclabs/hardhat-waffle');


module.exports = {
  solidity: '0.8.15',
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      chainId: 80001,
      accounts: process.env.PRIVATE_KEY,
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

  