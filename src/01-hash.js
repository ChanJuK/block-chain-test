const crypto = require('node:crypto');

/**
 * 문자열을 SHA-256 해시(디지털 지문)로 바꿉니다.
 * 같은 입력은 항상 같은 해시를 만들고, 입력이 달라지면 해시도 달라집니다.
 *
 * @param {string} value 해시로 만들 문자열
 * @returns {string} 64글자의 16진수 해시
 */
function calculateHash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

module.exports = { calculateHash };
