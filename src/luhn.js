import {
  compose,
  ifElse,
  map,
  prepend,
  reduceRight,
  sum,
  F
} from 'ramda'

export const isDivisible = by => num =>
  num % by === 0

export const clamp = digit =>
  digit > 9 ? digit - 9 : digit

export const isOnlyNums = str =>
  /^\d+$/.test(str)

export const removeWhitespace = str =>
  str.match(/\S+/g).join('')

export const doubleSeconds = digits =>
  reduceRight(
    (digit, array) => array.length % 2 ? prepend(digit * 2, array) : prepend(digit, array),
    [],
    digits
  )

export const isValid = string =>
  compose(
    ifElse(
      string => string.length > 1 && isOnlyNums(string),
      compose(
        isDivisible(10),  //* 3: if sum is evenly divisible by 10, number is valid
        sum,              //* 2: sum all of the digits
        map(clamp),       //* 1: if doubling the number results in a number greater than 9, subtract 9 from product
        doubleSeconds,    //* 0: double every second digit starting from the right
        Array.from        //* break the number into individual digits
      ),
      F
    ),
    removeWhitespace      //* whitespace is ignored
  )(string)
