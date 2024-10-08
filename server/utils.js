const { keccak256 } = require("ethereum-cryptography/keccak")
const { hexToBytes, toHex } = require("ethereum-cryptography/utils")
const { secp256k1 } = require("ethereum-cryptography/secp256k1")

// deserialized passed signature
function deserializeSignature(serializedSignature) {
  const { r, s, recovery } = serializedSignature;
  const signatureHex = r + s;
  const signatureBytes = hexToBytes(signatureHex);
  return secp256k1.Signature.fromCompact(signatureBytes).addRecoveryBit(recovery);
}

// recover the initial public key of the sender that signed the signature
const recoverPublicKey = (msg, serializedSignature) => {
  const message = toHex(keccak256(Buffer.from(msg)))
  const signature = deserializeSignature(serializedSignature)
  const publicKey = signature.recoverPublicKey(message)
  const sender = toHex(publicKey.toRawBytes())

  return sender
}

module.exports = { recoverPublicKey };