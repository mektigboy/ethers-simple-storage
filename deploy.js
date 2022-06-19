const ethers = require("ethers");
const fs = require("fs-extra");

require("dotenv").config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:8545"); // Connect to local blockchain.
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log("Deploying. Please wait...");

    const contract = await contractFactory.deploy();
    
    await contract.deployTransaction.wait(1);
    
    const currentFavoriteNumber = await contract.retrieve();
    
    console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);

    const transactionResponse = await contract.store("7");
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();

    console.log(`Updated favorite number: ${updatedFavoriteNumber}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });