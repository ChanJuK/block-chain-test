const { Block } = require('./02-block');

/**
 * 블록들을 순서대로 보관하는 학습용 블록체인입니다.
 */
class Blockchain {
  constructor(difficulty = 0) {
    this.difficulty = difficulty;
    // 모든 체인은 첫 블록인 제네시스 블록부터 시작합니다.
    const genesisBlock = this.createGenesisBlock();
    genesisBlock.mineBlock(this.difficulty);
    this.chain = [genesisBlock];
  }

  createGenesisBlock() {
    return new Block({
      number: 0,
      timestamp: '2026-01-01T00:00:00.000Z',
      data: '제네시스 블록: 체인의 시작',
      previousHash: '0',
    });
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data, timestamp = new Date().toISOString()) {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block({
      number: previousBlock.number + 1,
      timestamp,
      data,
      previousHash: previousBlock.hash,
    });

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    return newBlock;
  }

  /**
   * 모든 블록의 데이터와 연결이 변조되지 않았는지 검사합니다.
   */
  isValid() {
    for (let index = 0; index < this.chain.length; index += 1) {
      const currentBlock = this.chain[index];

      // 현재 블록의 저장된 해시가, 현재 데이터로 다시 만든 해시와 같은가?
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // 작업 증명 난이도를 만족하는 해시인가?
      if (!currentBlock.hash.startsWith('0'.repeat(this.difficulty))) {
        return false;
      }

      // 첫 블록 이후부터는 이전 블록의 현재 해시를 정확히 기억하는가?
      if (index > 0) {
        const previousBlock = this.chain[index - 1];

        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
    }

    return true;
  }
}

if (require.main === module) {
  const blockchain = new Blockchain();
  blockchain.addBlock('민지가 준호에게 1 코인을 보냄', '2026-11-02T10:00:00.000Z');
  blockchain.addBlock('준호가 서연에게 0.5 코인을 보냄', '2026-11-02T10:01:00.000Z');

  console.table(blockchain.chain);
}

module.exports = { Blockchain };
