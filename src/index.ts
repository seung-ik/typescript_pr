import * as CryptoJS from 'crypto-js'
class Block {
  public index:number;
  public hash: string;
  public previousHash : string;
  public data : string;
  public timestamp : number;

  static calculateBlockHash= (
    index:number,
    previousHash:string,
    data:string,
    timestamp:number
  ): string=>{
    return CryptoJS.SHA256(index+previousHash+data+timestamp).toString();
  }

  static validateStructure = (aBlock : Block):boolean=>{
    return(
      typeof aBlock.data === "string" && typeof aBlock.hash === 'string' && typeof aBlock.index==="number" && typeof aBlock.timestamp === "number" && typeof aBlock.previousHash ==="string"
    )
  }

  constructor(
    index:number,
    hash: string,
    previousHash : string,
    data : string,
    timestamp : number
    ){
      this.index=index;
      this.hash=hash;
      this.previousHash=previousHash;
      this.data=data;
      this.timestamp=timestamp;
    }
}

const genesisBlock:Block = new Block(0,"123123","","hello",3123123)

let blockchain: Block[] = [genesisBlock]

const getBlockChain = ():Block[] => blockchain

const getLatestBlock = ():Block => blockchain[blockchain.length-1]

const getNewTimeStamp = ():number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string):Block =>{
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index +1
  const newTimestamp:number = getNewTimeStamp()
  const newHash :string = Block.calculateBlockHash(newIndex,previousBlock.hash,data,newTimestamp)
  const newBlock : Block = new Block(newIndex,newHash,previousBlock.hash,data,newTimestamp)
  return newBlock
}

const isValidBlock = (candidateBlock:Block,previousBlock:Block)=>{
  if(! Block.validateStructure(candidateBlock)){
    return false
  }else if(previousBlock.index +1 !== candidateBlock.index){
    return false
  }else if(previousBlock.hash !== candidateBlock.previousHash){
    return false
  }
}

console.log(createNewBlock("wow"))
console.log(createNewBlock("rich"))