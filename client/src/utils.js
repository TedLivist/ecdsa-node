import { keccak256 } from "ethereum-cryptography/keccak"
import { utf8ToBytes } from "ethereum-cryptography/utils"
import { secp256k1 } from "ethereum-cryptography/secp256k1"

// hash the message
const hashMessage = (msg) => {
  const splitMessage = utf8ToBytes(msg)
  const hashedMessage = keccak256(splitMessage)

  return hashedMessage
}

// sign the hashed message
export const signMessage = async (msg, privateKey) => {
  const hashedMessage = hashMessage(msg)
  const signedMessage = secp256k1.sign(hashedMessage, privateKey)

  return signedMessage
}

// serialize the signed message so it can be passed back to the backend
export const serializableSignature = (signedMessage) => {
  return {
    r: signedMessage.r.toString(16),
    s: signedMessage.s.toString(16),
    recovery: signedMessage.recovery
  };
}