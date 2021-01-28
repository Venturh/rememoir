import * as crypto from 'crypto'
import cryptoJs from 'crypto-js'
import { EntryInput, ListInput } from '../generated/graphql'

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
    title: aesEncrypt(entry.title, key),
    description: aesEncrypt(entry.description, key),
    hashedKey: aesEncrypt(key, secretKey),
  }

  return encrypted
}
export function decryptEntry(entry: EntryInput) {
  const secretKey = getSectretKey()
  if (secretKey === null) return
  const key = aesDecrypt(entry.hashedKey, secretKey)
  const decrypted: EntryInput = {
    ...entry,
    title: aesDecrypt(entry.title, key),
    description: aesDecrypt(entry.description, key),
  }

  return decrypted
}

export function encryptList(list: ListInput) {
  const secretKey = getSectretKey()
  const key = generateKey()
  const encrypted: ListInput = {
    ...list,
    title: aesEncrypt(list.title, key),
    description: aesEncrypt(list.description, key),
    hashedKey: aesEncrypt(key, secretKey),
  }
  return encrypted
}

export function decryptList(list: ListInput) {
  const secretKey = getSectretKey()
  if (secretKey === null) return
  const key = aesDecrypt(list.hashedKey, secretKey)
  const decrypted: ListInput = {
    ...list,
    title: aesDecrypt(list.title, key),
    description: aesDecrypt(list.description, key),
    entries: list.entries.map((entry) => decryptEntry(entry)),
  }

  return decrypted
}

export function decryptDataKey(skey: string) {
  const secretKey = getSectretKey()
  const key = aesDecrypt(skey, secretKey)
  return key
}
