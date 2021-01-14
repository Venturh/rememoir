import * as crypto from 'crypto'
import cryptoJs from 'crypto-js'
import { EntryInput } from '../generated/graphql'

function generateKey() {
  return crypto
    .randomBytes(16)
    .toString('hex')
    .match(/.{1,4}/g)
    .join('-')
}

export function generateSecretKey() {
  const key = generateKey()
  localStorage.setItem('secretKey', key)
  return key
}
export function setSecretKey(key: string) {
  localStorage.setItem('secretKey', key)
}

export function getSectretKey() {
  const key = localStorage.getItem('secretKey')
  if (key) return key
  else return null
}

export function hash(toHash: string) {
  return cryptoJs.SHA256(toHash).toString(cryptoJs.enc.Hex)
}

export function aesEncrypt(data: any, key: any) {
  return cryptoJs.AES.encrypt(data, key).toString()
}
export function aesDecrypt(data: any, key: any) {
  return cryptoJs.AES.decrypt(data, key).toString(cryptoJs.enc.Utf8)
}

export function encryptEntry(entry: EntryInput) {
  const secretKey = getSectretKey()
  const key = generateKey()
  const encrypted: EntryInput = {
    ...entry,
    contentText: aesEncrypt(entry.contentText, key),
    hashedKey: aesEncrypt(key, secretKey),
  }

  return encrypted
}
export function decryptEntry(entry: EntryInput) {
  const secretKey = getSectretKey()
  console.log('decryptEntry ~ secretKey', secretKey)
  if (secretKey === null) return
  const key = aesDecrypt(entry.hashedKey, secretKey)
  const decrypted: EntryInput = {
    ...entry,
    contentText: aesDecrypt(entry.contentText, key),
  }

  return decrypted
}
export function decryptEntryItem(item: any, skey: string) {
  const secretKey = getSectretKey()
  const key = aesDecrypt(skey, secretKey)
  return aesDecrypt(item, key)
}
export function decryptDataKey(skey: string) {
  const secretKey = getSectretKey()
  const key = aesDecrypt(skey, secretKey)
  return key
}
