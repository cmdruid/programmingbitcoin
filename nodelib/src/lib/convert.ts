export function bytesToHex(numArray: Uint8Array) {
  let strArr = [], i = 0
  for (;i < numArray.length; i++) {
    strArr.push(numArray[i].toString(16).padStart(2, '0'))
  }
  return strArr.join('')
}

export function hexToBytes(str: string): Uint8Array {
  let i = 0, numArr = new Uint8Array(str.length)
  for (;i < str.length; i += 2) {
    numArr[i] = parseInt(str.slice(i, 2), 16)
  }
  return numArr
}
