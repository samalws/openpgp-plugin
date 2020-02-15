const openpgp = require('openpgp')

module.exports.pgp = {
  async sign ({ payload, secretKey }) {
    // We need to use fromBinary because fromText screws with line endings
    const data = openpgp.util.encode_utf8(payload)
    const message = openpgp.message.fromBinary(data)
    const privateKeys = (await openpgp.key.readArmored(secretKey)).keys
    let { signature } = await openpgp.sign({
      message,
      privateKeys,
      detached: true,
      armor: true
    })
    return { signature }
  },
  async verify ({ payload, publicKey, signature }) {
    const data = openpgp.util.encode_utf8(payload)
    const message = openpgp.message.fromBinary(data)
    signature = await openpgp.signature.readArmored(signature)
    const publicKeys = (await openpgp.key.readArmored(publicKey)).keys
    let { signatures } = await openpgp.verify({
      message,
      signature,
      publicKeys
    })
    let invalid = []
    let valid = []
    for (let sig of signatures) {
      (sig.valid ? valid : invalid).push(sig.keyid.toHex())
    }
    return { valid, invalid }
  }
}
