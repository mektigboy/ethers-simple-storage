const ethers = require("ethers");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Connect to local blockchain.
    const wallet = new ethers.Wallet(
        "dd7ce4bfa28c2f52da2e830c2f16472935c2e3a4e38bd21ccce413b9dc6a4e73",
        provider
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });