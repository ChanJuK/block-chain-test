const crypto = require('node:crypto');

/**
 * 학습용 지갑입니다.
 * 공개키는 다른 사람에게 알려도 되지만, 개인키는 절대 공개하면 안 됩니다.
 */
function createWallet() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');

  return {
    publicKey: publicKey.export({ type: 'spki', format: 'pem' }),
    privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }),
  };
}

function transactionPayload({ sender, recipient, amount }) {
  // 서명할 데이터의 모양을 항상 같게 만듭니다.
  return JSON.stringify({ sender, recipient, amount });
}

/**
 * 보낼 사람의 개인키로 거래 내용에 서명합니다.
 * 개인키 자체는 결과 거래에 포함되지 않습니다.
 */
function signTransaction({ sender, recipient, amount }, privateKey) {
  const payload = transactionPayload({ sender, recipient, amount });
  const signature = crypto.sign(null, Buffer.from(payload), privateKey).toString('base64');

  return { sender, recipient, amount, signature };
}

/**
 * 거래에 적힌 sender 공개키로 서명이 유효한지 확인합니다.
 */
function isValidTransaction(transaction) {
  const payload = transactionPayload(transaction);

  return crypto.verify(
    null,
    Buffer.from(payload),
    transaction.sender,
    Buffer.from(transaction.signature, 'base64'),
  );
}

module.exports = {
  createWallet,
  isValidTransaction,
  signTransaction,
};
