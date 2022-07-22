// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const mintFee = 2
	const mintFeeToken = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

	const CeloAvatars = await hre.ethers.getContractFactory("CeloAvatars")
	console.log("Deploying.......")
	const celoAvatars = await CeloAvatars.deploy(mintFee, mintFeeToken)

	await celoAvatars.deployed()

	console.log("Celo Avatars deployed to:", celoAvatars.address)
	storeContractData(celoAvatars)
}

function storeContractData(contract) {
	const fs = require("fs")
	const contractsDir = __dirname + "/../utils/contracts"

	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir)
	}

	fs.writeFileSync(
		contractsDir + "/CeloAvatars-address.json",
		JSON.stringify({ cAVT: contract.address }, undefined, 2)
	)

	const CeloAvatarsArtifact = artifacts.readArtifactSync("CeloAvatars")

	fs.writeFileSync(
		contractsDir + "/CeloAvatars.json",
		JSON.stringify(CeloAvatarsArtifact, null, 2)
	)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
