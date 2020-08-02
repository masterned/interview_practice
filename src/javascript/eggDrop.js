const {
  floor,
  random,
  trunc,
  log10
} = Math

export class NotEnoughEggsException extends Error {
  constructor() {
    super('Attempted to drop more eggs than allotted.')
  }
}

export class UnknownAlgorithmException extends Error {
  constructor() {
    super('Algorithm not found.')
  }
}

export const MAX_SAFE_LEVEL = floor(random() * 100)

export const eggBreaksAt = height => height > MAX_SAFE_LEVEL

export const even = building => building.map((_, i) => trunc((i + 1) / 2) + 2)

export const pow2 = (floors, eggs) => {

}

const toDigits = number =>
  number
    .toString()
    .split('')
    .reverse()
    .map(s => +s)

export const radix = building => building.map((_, i) => {
  const [UNITS = 0, TENS = 0, HUNDREDS = 0] = toDigits(i + 1)

  if (HUNDREDS) return 10

  return TENS + UNITS + (
    UNITS === 9
      ? 1
      : 2
  )
})

const dynamic = (floors, eggs) => {

}

export const throwUnknownAlgorithmException = () => {
  throw new UnknownAlgorithmException()
}

export const simulate = (algorithm = radix, numberFloors = 100, numberEggs = 2) =>
  algorithm(new Array(numberFloors).fill(0), numberEggs)
