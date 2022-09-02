
export function add(a: bigint, b: bigint): bigint {
  if (b === 0n) {
    return a
  } else {
    return add(a^b , (a&b) << 1n)
  }
}