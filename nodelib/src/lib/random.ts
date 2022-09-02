export const rand = (prime: number) => Math.floor(Math.random() * (prime - 1))

export function randomInt(
  min: number,
  max: number
): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}