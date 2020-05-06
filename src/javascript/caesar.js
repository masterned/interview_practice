import { curry, pipe } from 'ramda'

export const ENGLISH_LETTER_COUNT = 26

const ASCII = Object.freeze({
  LOWER_A: 'a'.charCodeAt(0),
  LOWER_Z: 'z'.charCodeAt(0),
  UPPER_A: 'A'.charCodeAt(0),
  UPPER_Z: 'Z'.charCodeAt(0)
})

export const bindCharacterCode = curry((numberOfLetters, code) =>
  code >= 0
    ? code % numberOfLetters
    : numberOfLetters + code)

export const isUppercaseLetter = code => ASCII.UPPER_A <= code && code <= ASCII.UPPER_Z

export const isLowercaseLetter = code => ASCII.LOWER_A <= code && code <= ASCII.LOWER_Z

export const rotateLetter = curry((characterBinder, rotation, code) =>
  isUppercaseLetter(code)
    ? characterBinder(code - ASCII.UPPER_A + rotation) + ASCII.UPPER_A
    : isLowercaseLetter(code)
      ? characterBinder(code - ASCII.LOWER_A + rotation) + ASCII.LOWER_A
      : code)

export const toCharacterCode = char => char.charCodeAt(0)

export const fromCharacterCode = code => String.fromCharCode(code)

export const caesar = (string, rotation, numberOfLetters = ENGLISH_LETTER_COUNT) =>
  string
    .split('')
    .map(
      pipe(
        toCharacterCode,
        rotateLetter(bindCharacterCode(numberOfLetters), rotation),
        fromCharacterCode
      )
    )
    .join('')
