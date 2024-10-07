const { keccak256 } = require("ethereum-cryptography/keccak")
const { utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils")
const { secp256k1 } = require("ethereum-cryptography/secp256k1")

// hash passed message for verification
const hashMessage = (msg) => {
  const splitMessage = utf8ToBytes(msg)
  const hashedMessage = keccak256(splitMessage)

  return hashedMessage
}

// deserialized passed signature
function deserializeSignature(serializedSignature) {
  const { r, s, recovery } = serializedSignature;
  const signatureHex = r + s;
  const signatureBytes = hexToBytes(signatureHex);
  return secp256k1.Signature.fromCompact(signatureBytes).addRecoveryBit(recovery);
}

// verify that the signature was signed by the tx sender
const verifySignature = (message, serializedSignature, publicKey) => {
  const hashedMessage = hashMessage(message)
  const signature = deserializeSignature(serializedSignature)
  const isSigned = secp256k1.verify(signature, hashedMessage, publicKey)

  return isSigned
}

module.exports = { verifySignature };