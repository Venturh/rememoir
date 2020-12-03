import * as crypto from 'crypto'
import * as CryptoJS from 'crypto-js'

export const generateSecretKey = () => {
  return crypto
    .randomBytes(16)
    .toString('hex')
    .match(/.{1,4}/g)
    .join('-')
}

export const hash = (toHash: string) => {
  return CryptoJS.SHA256(toHash).toString(CryptoJS.enc.Hex)
}
