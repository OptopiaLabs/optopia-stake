import '@nomicfoundation/hardhat-chai-matchers'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-verify'
import '@typechain/hardhat'

import 'hardhat-deploy'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import 'hardhat-storage-layout'
import 'solidity-docgen'

import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || './.env'
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) })

if (process.env.NODE_ENV != 'build') {
	require('./tasks')
}

const accounts = {
	mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test test',
}

const config = {
	solidity: {
		compilers: [
			{
				version: '0.8.20',
				settings: {},
			},
		],
	},
	namedAccounts: {
		deployer: 0,
		simpleERC20Beneficiary: 1
	},
	networks: {
		hardhat: {
			accounts,
			gas: 'auto',
			gasPrice: 'auto',
			gasMultiplier: 1.3,
			chainId: 1337,
		},
		'optopia-sepolia': {
			url: 'https://rpc-testnet.optopia.ai/',
			accounts
		},
		'optopia': {
			url: 'https://rpc-mainnet-2.optopia.ai',
			accounts,
			zksync: false,
		},
	},
	etherscan: {
		apiKey: {
			'zeta-mainnet-pro': process.env.APIKEY_MAINNET!,
			mainnet: process.env.APIKEY_MAINNET!,
			bsc: process.env.APIKEY_BSC!,
			polygon: process.env.APIKEY_POLYGON!,
			goerli: process.env.APIKEY_GOERLI!,
			bscTestnet: process.env.APIKEY_CHAPEL!,
			polygonMumbai: process.env.APIKEY_MUMBAI!
		},
		customChains: [
			{
				network: 'zeta-mainnet-pro',
				chainId: 7000,
				urls: {
					apiURL: 'https://zetachain.blockscout.com/api',
					browserURL: 'https://zetachain.blockscout.com/'
				}
			}
		]
	},
	paths: {
		deploy: 'deploy',
		artifacts: 'artifacts',
		cache: 'cache',
		sources: 'contracts',
		tests: 'test'
	},
	gasReporter: {
		currency: 'USD',
		gasPrice: 100,
		enabled: process.env.REPORT_GAS ? true : false,
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		maxMethodDiff: 10,
	},
	docgen: {
		templates: './hbs',
		root: './',
		theme: 'markdown',
		sourcesDir: './contracts',
		pages: 'files',
		outputDir: './docs'
	},
	typechain: {
		outDir: 'types',
		target: 'ethers-v6',
	},
	mocha: {
		timeout: 0,
	}
}

export default config
