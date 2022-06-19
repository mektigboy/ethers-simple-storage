const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:8545"); // Connect to local blockchain.
    const wallet = new ethers.Wallet(
        "4a083bf5e32f3a230980d9beb22ec5abd72317659ed4650552ab6e47b274bd73",
        provider
    );
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log("Deploying. Please wait...");

    const contract = await contractFactory.deploy();
    
    await contract.deployTransaction.wait(1);
    
    const currentFavoriteNumber = await contract.retrieve();
    
    console.log(currentFavoriteNumber);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });