export function mod(n: bigint, m: bigint) {
  return (n % m + m) % m
}

export function pow(
  num   : bigint, 
  exp   : bigint, 
  prime : bigint = 0n
) {
  let i, ans = num
  for (i = 1; i < exp; i++) {
    ans *= num
    console.log(ans)
    if (prime) ans = mod(ans, prime)  
  }
  return ans
}