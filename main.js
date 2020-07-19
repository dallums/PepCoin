const SHA256 = require('crypto-js/sha256');

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

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // re-calculating the hash to make sure it's what it presently is
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let pepcoin = new Blockchain();
pepcoin.addBlock(new Block(1, "10/01/2020", { amount: 4 }));
pepcoin.addBlock(new Block(2, "11/01/2020", { amount: 6 }));

console.log('Is blockchain valid? ' + pepcoin.isChainValid());

// changing block 2 to test
pepcoin.chain[1].data = { amount: 100 };
console.log('Is blockchain valid? ' + pepcoin.isChainValid());

// what if we re-compute the hash?
pepcoin.chain[1].calculateHash()
console.log('Is blockchain valid? ' + pepcoin.isChainValid());

//console.log(JSON.stringify(pepcoin, null, 4));