import * as crypto from 'crypto'
import * as CryptoJS from 'crypto-js'

export function generateSecretKey() {
  const key = crypto
    .randomBytes(16)
    .toString('hex')
    .match(/.{1,4}/g)
    .join('-')
  localStorage.setItem('secretKey', key)
  return key
}

export function getSectretKey() {
  const key = localStorage.getItem('secretKey')
  if (key) return key
  else throw new Error('SECRET_KEY_NOT_FOUND')
}

export function hash(toHash: string) {
  return CryptoJS.SHA256(toHash).toString(CryptoJS.enc.Hex)
}
