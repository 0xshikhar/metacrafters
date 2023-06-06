
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config()

module.exports = {
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true
			}
		}
	},
	allowUnlimitedContractSize: true,
	networks: {
		hardhat: {},
		mumbai: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `${process.env.MUMBAI_URL}`
		},
		goerli: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `${process.env.GOERLI_URL}`
		},
	},
	etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	}
}



// module.exports = {
// 	networks: {
// 		mumbai: {
// 			url: [process.env.MUMBAI_URL],
// 			accounts,
// 		},
// 		goreli: {
// 			url: alchemyRPCs.goreli,
// 			accounts,
// 		},
// 	},
// 	paths: {
// 		sources: './contracts',
// 		tests: './test',
// 		cache: './cache',
// 		artifacts: './artifacts',
// 	},
// 	solidity: '0.8.4',
// }
