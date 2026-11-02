const { Block } = require('./02-block');

const block = new Block({
  number: 1,
  timestamp: '2026-11-02T10:00:00.000Z',
  data: '민지가 준호에게 1 코인을 보냄',
  previousHash: '0',
});

const difficulty = 3;

console.log('채굴 전');
console.log({ nonce: block.nonce, hash: block.hash });

block.mineBlock(difficulty);

console.log(`난이도 ${difficulty}: 해시가 0 ${difficulty}개로 시작해야 합니다.`);
console.log('채굴 후');
console.log({ nonce: block.nonce, hash: block.hash });
