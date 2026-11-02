const test = require('node:test');
const assert = require('node:assert/strict');
const { Block } = require('../src/02-block');
const { Blockchain } = require('../src/03-blockchain');

test('채굴은 난이도만큼 0으로 시작하는 해시를 찾는다', () => {
  const block = new Block({
    number: 1,
    timestamp: '2026-11-02T10:00:00.000Z',
    data: '민지가 준호에게 1 코인을 보냄',
    previousHash: '0',
  });

  block.mineBlock(2);

  assert.match(block.hash, /^00/);
  assert.equal(block.hash, block.calculateHash());
  assert.ok(Number.isInteger(block.nonce));
});

test('난이도가 있는 체인에 추가된 블록은 작업 증명을 만족한다', () => {
  const blockchain = new Blockchain(2);
  const block = blockchain.addBlock(
    '민지가 준호에게 1 코인을 보냄',
    '2026-11-02T10:00:00.000Z',
  );

  assert.match(block.hash, /^00/);
  assert.equal(blockchain.isValid(), true);
});
