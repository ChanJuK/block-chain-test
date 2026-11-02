const { calculateHash } = require('./01-hash');

/**
 * 학습용으로 아주 단순하게 만든 블록입니다.
 * 실제 블록체인은 여기에 시간, 서명, 거래 목록 등 더 많은 정보를 넣습니다.
 */
function createBlock(number, data, previousHash) {
  const hash = calculateBlockHash(number, data, previousHash);

  return { number, data, previousHash, hash };
}

function calculateBlockHash(number, data, previousHash) {
  return calculateHash(`${number}|${data}|${previousHash}`);
}

function createExampleChain() {
  const block1 = createBlock(1, '민지가 준호에게 1 코인을 보냄', '0');
  const block2 = createBlock(2, '준호가 서연에게 0.5 코인을 보냄', block1.hash);
  const block3 = createBlock(3, '서연이 민지에게 0.2 코인을 보냄', block2.hash);

  return [block1, block2, block3];
}

/**
 * 체인이 변조되지 않았는지 확인합니다.
 * 1. 블록 안의 데이터로 다시 만든 해시가 저장된 해시와 같은가?
 * 2. 각 블록은 바로 앞 블록의 현재 해시를 기억하는가?
 */
function isValidChain(chain) {
  for (let index = 0; index < chain.length; index += 1) {
    const block = chain[index];
    const recalculatedHash = calculateBlockHash(
      block.number,
      block.data,
      block.previousHash,
    );

    if (block.hash !== recalculatedHash) {
      return {
        valid: false,
        reason: `${block.number}번 블록의 데이터와 해시가 맞지 않습니다.`,
      };
    }

    if (index > 0 && block.previousHash !== chain[index - 1].hash) {
      return {
        valid: false,
        reason: `${block.number}번 블록이 기억한 이전 해시가 실제 이전 블록 해시와 다릅니다.`,
      };
    }
  }

  return { valid: true, reason: '모든 블록의 데이터와 연결이 정상입니다.' };
}

if (require.main === module) {
  const chain = createExampleChain();
  // 실제 블록체인처럼 이미 정상으로 확인된 체인은 건드리지 않습니다.
  // 여기서는 변조 시도를 표현하기 위해 사본을 따로 만듭니다.
  const tamperedChain = chain.map((block) => ({ ...block }));

  console.log('\n처음 만든 체인');
  console.table(chain);
  console.log(isValidChain(chain));

  // 누군가 1번 블록의 거래 내용을 바꾸고, 그 블록의 해시도 새로 계산했다고 가정합니다.
  tamperedChain[0].data = '민지가 준호에게 100 코인을 보냄';
  tamperedChain[0].hash = calculateBlockHash(
    tamperedChain[0].number,
    tamperedChain[0].data,
    tamperedChain[0].previousHash,
  );

  console.log('\n1번 블록을 변조하고 해시까지 다시 만든 뒤');
  console.table(tamperedChain);
  console.log(isValidChain(tamperedChain));

  console.log('\n거부된 변조 사본과 별개로, 원래 체인은 그대로 정상입니다.');
  console.log(isValidChain(chain));
}

module.exports = {
  calculateBlockHash,
  createBlock,
  createExampleChain,
  isValidChain,
};
