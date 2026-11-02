const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateHash } = require('../src/01-hash');

test('같은 입력은 언제나 같은 해시를 만든다', () => {
  assert.equal(calculateHash('hello'), calculateHash('hello'));
});

test('입력이 달라지면 해시도 달라진다', () => {
  assert.notEqual(calculateHash('hello'), calculateHash('Hello'));
});

test('SHA-256 해시는 64글자의 16진수 문자열이다', () => {
  const hash = calculateHash('blockchain');

  assert.match(hash, /^[a-f0-9]{64}$/);
});
