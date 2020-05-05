import { cond, curry, equals, identity, ifElse, join, length, map, T as otherwise, pipe, prepend, reduceRight, replace, F as returnFalse, sum, test, toString, type } from 'ramda'

const { isArray } = Array

export const isDivisible = curry(
  (by, num) => num % by === 0
)

export const clamp = digit =>
  digit > 9
    ? digit - 9
    : digit

export const convertToString = cond([
  [pipe(type, equals('String')), identity],
  [isArray, pipe(map(toString), join(''))],
  [otherwise, toString]
])

export const isOnlyNums = test(/^\d+$/)

export const removeWhitespace = replace(/\s+/g, '')

export const doubleSeconds = reduceRight(
  (digit, array) =>
    isDivisible(2, length(array))
      ? prepend(digit, array)
      : prepend(digit * 2, array),
  []
)

const isValid = pipe(
  convertToString,      //* inforces the input data to be a string
  removeWhitespace,     //* remove the whitespace
  ifElse(
    string => (length(string) > 1) && isOnlyNums(string),
    pipe(
      Array.from,       //* break the number into individual digits
      doubleSeconds,    //* 0: double every second digit starting from the right
      map(clamp),       //* 1: if doubling the number results in a number greater than 9, subtract 9 from product
      sum,              //* 2: sum all of the digits
      isDivisible(10)   //* 3: if sum is evenly divisible by 10, number is valid
    ),
    returnFalse
  )
)

export default isValid
