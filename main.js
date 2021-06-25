// importing haashing module
const SHA256 = require("crypto-js/sha256");

// Creating the class module
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        
        // calling a function to get a unique hash code
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

// Creating the main path
class BlockChain {
    constructor() {
        // Making sure of the presence of the genesis block
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "25/06/21", "NULL_GENESIS", "000");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

// Local Instance 👇
let tempChain = new BlockChain();

tempChain.addBlock(new Block(1, "25/06/21", { coins: 4 }));
tempChain.addBlock(new Block(2, "29/06/21", { coins: 12 }));

console.log(JSON.stringify(tempChain, null, 4));