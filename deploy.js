const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Connect to local blockchain.
    const wallet = new ethers.Wallet(
        "dd7ce4bfa28c2f52da2e830c2f16472935c2e3a4e38bd21ccce413b9dc6a4e73",
        provider
    );
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log("Deploying. Please wait...");

    const contract = await contractFactory.deploy();
    const deploymentReceipt = await contract.deployTransaction.wait(1);
    console.log("Here is the deployment transaction (transaction response): ");
    console.log(contract.deployTransaction);
    console.log("Here is the transaction receipt: ");
    console.log(deploymentReceipt);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });