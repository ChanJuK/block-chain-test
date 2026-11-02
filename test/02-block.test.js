const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateHash } = require('../src/01-hash');
const { Block } = require('../src/02-block');

const block = new Block({
  number: 1,
  timestamp: '2026-11-02T10:00:00.000Z',
  data: '민지가 준호에게 1 코인을 보냄',
  previousHash: '0',
});

test('블록은 번호, 시간, 데이터, 이전 해시를 저장한다', () => {
  assert.equal(block.number, 1);
  assert.equal(block.timestamp, '2026-11-02T10:00:00.000Z');
  assert.equal(block.data, '민지가 준호에게 1 코인을 보냄');
  assert.equal(block.previousHash, '0');
});

test('블록의 해시는 블록 안의 중요한 정보에서 만들어진다', () => {
  const expectedHash = calculateHash(
    '1|2026-11-02T10:00:00.000Z|민지가 준호에게 1 코인을 보냄|0|0',
  );

  assert.equal(block.hash, expectedHash);
});

test('블록의 데이터가 바뀌면 다시 계산한 해시는 기존 해시와 달라진다', () => {
  block.data = '민지가 준호에게 100 코인을 보냄';

  assert.notEqual(block.calculateHash(), block.hash);
});
