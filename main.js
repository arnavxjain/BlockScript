// importing haashing module
const SHA256 = require("crypto-js/sha256");

// Creating the class module
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        
        // calling a function to get a unique hash code
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined To Hash", this.hash);
    }
}

// Creating the main path
class BlockChain {
    constructor() {
        // Making sure of the presence of the genesis block
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock() {
        return new Block(0, "25/06/21", "NULL_GENESIS", "000");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    verifyChain() {
        for (let x = 1; x < this.chain.length; x++) {
            let currentBlock = this.chain[x];
            let previousBlock = this.chain[x - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }

        return true;
    }
}

// Local Instance 👇
let blockscript = new BlockChain();
