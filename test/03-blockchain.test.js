const test = require('node:test');
const assert = require('node:assert/strict');
const { Blockchain } = require('../src/03-blockchain');

test('새 블록체인은 제네시스 블록 하나로 시작한다', () => {
  const blockchain = new Blockchain();

  assert.equal(blockchain.chain.length, 1);
  assert.equal(blockchain.getLatestBlock().number, 0);
  assert.equal(blockchain.getLatestBlock().previousHash, '0');
});

test('새 블록은 직전 블록의 해시를 previousHash로 저장한다', () => {
  const blockchain = new Blockchain();
  const genesisBlock = blockchain.getLatestBlock();

  const newBlock = blockchain.addBlock(
    '민지가 준호에게 1 코인을 보냄',
    '2026-11-02T10:00:00.000Z',
  );

  assert.equal(newBlock.number, 1);
  assert.equal(newBlock.previousHash, genesisBlock.hash);
  assert.equal(blockchain.getLatestBlock(), newBlock);
});

test('블록을 계속 추가하면 바로 앞 블록과 차례로 연결된다', () => {
  const blockchain = new Blockchain();
  const block1 = blockchain.addBlock('민지가 준호에게 1 코인을 보냄', '2026-11-02T10:00:00.000Z');
  const block2 = blockchain.addBlock('준호가 서연에게 0.5 코인을 보냄', '2026-11-02T10:01:00.000Z');

  assert.equal(blockchain.chain.length, 3);
  assert.equal(block2.previousHash, block1.hash);
});
