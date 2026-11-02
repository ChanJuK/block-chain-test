const test = require('node:test');
const assert = require('node:assert/strict');
const {
  calculateBlockHash,
  createBlock,
  createExampleChain,
  isValidChain,
} = require('../src/01-chain-example');

test('각 블록은 바로 앞 블록의 해시를 기억한다', () => {
  const [block1, block2, block3] = createExampleChain();

  assert.equal(block2.previousHash, block1.hash);
  assert.equal(block3.previousHash, block2.hash);
});

test('블록의 데이터를 바꾸면 그 블록의 해시가 달라진다', () => {
  const original = createBlock(1, '민지가 준호에게 1 코인을 보냄', '0');
  const changed = createBlock(1, '민지가 준호에게 100 코인을 보냄', '0');

  assert.notEqual(original.hash, changed.hash);
});

test('과거 블록을 변조하고 해시를 다시 만들어도 다음 블록과의 연결은 깨진다', () => {
  const originalChain = createExampleChain();
  const tamperedChain = originalChain.map((block) => ({ ...block }));

  tamperedChain[0].data = '민지가 준호에게 100 코인을 보냄';
  tamperedChain[0].hash = calculateBlockHash(
    tamperedChain[0].number,
    tamperedChain[0].data,
    tamperedChain[0].previousHash,
  );

  assert.deepEqual(isValidChain(tamperedChain), {
    valid: false,
    reason: '2번 블록이 기억한 이전 해시가 실제 이전 블록 해시와 다릅니다.',
  });
  assert.equal(isValidChain(originalChain).valid, true);
});
