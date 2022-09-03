import { webcrypto as crypto } from 'crypto'
import { bytesToHex } from './convert'

export const rand = (prime: number) => Math.floor(Math.random() * (prime - 1))

/**
 * Returns a random bigint of specified size.
 * 
 * @param size - The size of the array (in bytes).
 * @returns A random bigint (based on the size of byte array)
 */
export function randBigInt(size: number = 32): bigint {
  const randBytes = crypto.getRandomValues(new Uint8Array(size)),
        randHex   = bytesToHex(randBytes)
  return BigInt('0x' + randHex)
}
