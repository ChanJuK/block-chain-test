const { calculateHash } = require('./01-hash');

/**
 * 블록체인에서 하나의 기록 묶음을 표현하는 학습용 블록입니다.
 * 실제 블록에는 거래 목록, 난이도, 서명 등 더 많은 정보가 들어갑니다.
 */
class Block {
  constructor({ number, timestamp, data, previousHash, nonce = 0 }) {
    this.number = number;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    // 작업 증명을 위해 계속 바꿔 보는 숫자입니다.
    this.nonce = nonce;

    // 블록의 중요한 정보 전체로 현재 블록의 지문을 만듭니다.
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const valuesToProtect = `${this.number}|${this.timestamp}|${this.data}|${this.previousHash}|${this.nonce}`;

    return calculateHash(valuesToProtect);
  }

  /**
   * 해시가 0으로 시작하는 개수가 difficulty와 같아질 때까지 nonce를 바꿉니다.
   */
  mineBlock(difficulty) {
    const targetPrefix = '0'.repeat(difficulty);
    console.log(`난이도 ${difficulty}: 해시가 0 ${targetPrefix}`);

    while (!this.hash.startsWith(targetPrefix)) {
      this.nonce += 1;
      this.hash = this.calculateHash();
    }

    return this.hash;
  }
}

module.exports = { Block };
