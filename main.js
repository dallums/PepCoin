const SHA256 = require('crypto-js/sha265');

class Block{
    constructor(index, timestamp, data, previousHash= '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        // just a hash function - SHA256, install crypto-js with npm in the shell
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]; //array of blocks, first block called genesis block, added manually
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis block", "0");
    }

    getLatestBLock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBLock().hash;

        // need to re-calc hash since we modified something
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}