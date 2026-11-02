const {
  createWallet,
  isValidTransaction,
  signTransaction,
} = require('./06-transaction');

const minjiWallet = createWallet();
const junhoWallet = createWallet();

const transaction = signTransaction(
  {
    sender: minjiWallet.publicKey,
    recipient: junhoWallet.publicKey,
    amount: 1,
  },
  minjiWallet.privateKey,
);

console.log('민지가 개인키로 서명한 거래:', isValidTransaction(transaction));

// 개인키 없이 거래 내용만 바꿨다고 가정합니다.
transaction.amount = 100;
console.log('금액을 100으로 변조한 거래:', isValidTransaction(transaction));
