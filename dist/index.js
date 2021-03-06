"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, data, timestamp) => {
    return CryptoJS.SHA256(index + previousHash + data + timestamp).toString();
};
Block.validateStructure = (aBlock) => {
    return (typeof aBlock.data === "string" && typeof aBlock.hash === 'string' && typeof aBlock.index === "number" && typeof aBlock.timestamp === "number" && typeof aBlock.previousHash === "string");
};
const genesisBlock = new Block(0, "123123", "", "hello", 3123123);
let blockchain = [genesisBlock];
const getBlockChain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimestamp);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    return newBlock;
};
const isValidBlock = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
};
console.log(createNewBlock("wow"));
console.log(createNewBlock("rich"));
//# sourceMappingURL=index.js.map