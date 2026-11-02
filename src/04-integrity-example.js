const { Blockchain } = require('./03-blockchain');

function createSampleChain() {
  const blockchain = new Blockchain();
  blockchain.addBlock('민지가 준호에게 1 코인을 보냄', '2026-11-02T10:00:00.000Z');
  blockchain.addBlock('준호가 서연에게 0.5 코인을 보냄', '2026-11-02T10:01:00.000Z');
  return blockchain;
}

const normalChain = createSampleChain();
console.log('정상 체인:', normalChain.isValid());

const dataTamperedChain = createSampleChain();
dataTamperedChain.chain[1].data = '민지가 준호에게 100 코인을 보냄';
console.log('데이터만 변조:', dataTamperedChain.isValid());

const linkedTamperedChain = createSampleChain();
linkedTamperedChain.chain[1].data = '민지가 준호에게 100 코인을 보냄';
// 변조한 사람이 1번 블록의 해시까지 다시 계산했다고 가정합니다.
linkedTamperedChain.chain[1].hash = linkedTamperedChain.chain[1].calculateHash();
console.log('데이터와 1번 블록 해시를 함께 변조:', linkedTamperedChain.isValid());
