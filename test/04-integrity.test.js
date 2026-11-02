const test = require('node:test');
const assert = require('node:assert/strict');
const { Blockchain } = require('../src/03-blockchain');

function createSampleChain() {
  const blockchain = new Blockchain();
  blockchain.addBlock('민지가 준호에게 1 코인을 보냄', '2026-11-02T10:00:00.000Z');
  blockchain.addBlock('준호가 서연에게 0.5 코인을 보냄', '2026-11-02T10:01:00.000Z');
  return blockchain;
}

test('변조되지 않은 체인은 유효하다', () => {
  const blockchain = createSampleChain();

  assert.equal(blockchain.isValid(), true);
});

test('블록 데이터만 바꾸면 저장된 해시와 달라져 유효하지 않다', () => {
  const blockchain = createSampleChain();
  blockchain.chain[1].data = '민지가 준호에게 100 코인을 보냄';

  assert.equal(blockchain.isValid(), false);
});

test('변조한 블록의 해시까지 고쳐도 다음 블록과의 연결이 달라져 유효하지 않다', () => {
  const blockchain = createSampleChain();
  blockchain.chain[1].data = '민지가 준호에게 100 코인을 보냄';
  blockchain.chain[1].hash = blockchain.chain[1].calculateHash();

  assert.equal(blockchain.isValid(), false);
});
