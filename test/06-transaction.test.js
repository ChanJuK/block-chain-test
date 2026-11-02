const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createWallet,
  isValidTransaction,
  signTransaction,
} = require('../src/06-transaction');

function createSignedSampleTransaction() {
  const senderWallet = createWallet();
  const recipientWallet = createWallet();
  const transaction = signTransaction(
    {
      sender: senderWallet.publicKey,
      recipient: recipientWallet.publicKey,
      amount: 1,
    },
    senderWallet.privateKey,
  );

  return { transaction };
}

test('개인키로 서명한 거래는 공개키로 검증할 수 있다', () => {
  const { transaction } = createSignedSampleTransaction();

  assert.equal(isValidTransaction(transaction), true);
});

test('서명 뒤 거래 금액을 바꾸면 검증에 실패한다', () => {
  const { transaction } = createSignedSampleTransaction();
  transaction.amount = 100;

  assert.equal(isValidTransaction(transaction), false);
});

test('다른 사람의 공개키를 보낸 사람으로 바꾸면 검증에 실패한다', () => {
  const { transaction } = createSignedSampleTransaction();
  const anotherWallet = createWallet();
  transaction.sender = anotherWallet.publicKey;

  assert.equal(isValidTransaction(transaction), false);
});
