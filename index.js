// importing dependencie

const {
    Connection, 
    PublicKey,
    Keypair,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const newPair = Keypair.generate();


// Extracting  the publickey 
const publicKey = new PublicKey(newPair.publicKey).toString();
console.log("PublicKey: ", publicKey);

// connecting to a cluster

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    
    console.log("Connected Successfully");



const getWalletbalance = async () => {
    try{
        const walletBalance = await connection.getBalance(new PublicKey(publicKey))
        console.log(`Wallet Balance ${parseInt(walletBalance/ LAMPORTS_PER_SOL)}`);
    } catch(err){
        console.error("Error in Getting balance.", err);
    }
};

const getAirdop = async () => {

    try{
        const airdrop = await connection.requestAirdrop(new PublicKey(publicKey), LAMPORT_PER_SOL*10);
        await connection.confirmTransaction(airdrop);
        console.log("Airdrop confirmed");

    } catch(err){

        console.log("Error airdroping some SOL");
    }
};

const mainFunction = async  () => {
    
    await getWalletbalance();
    await getAirdop();
    await getWalletbalance();
};

mainFunction();

