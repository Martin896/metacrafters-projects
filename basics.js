const {
    Keypair,
    PublicKey,
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl
} = require('@solana/web3.js');

const newpair = new Keypair();

const connection  = new Connection(clusterApiUrl("devnet"), 'confirmed');


const publicKey = newpair.publicKey.toString();
console.log(publicKey);

const getWalletBalance = async () => {
    try{
       const  walletBalance = await connection.getBalance(new PublicKey(publicKey));
        console.log(`${parseInt(walletBalance/LAMPORTS_PER_SOL)}`);
    } catch(err){
        console.log("Failed to get Balance");
    }
};

const airdropSOL = async () => {
    try {
        const airdropWallet = await connection.requestAirdrop(new PublicKey(publicKey), 1.5* LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropWallet);
        console.log("Airdrop Confirmed");

    } catch(err){
        console.log("Failed to Airdrop", err);
    }
};

const main  =  async () => {
    await getWalletBalance();
    await airdropSOL();
    await getWalletBalance();
};

main();