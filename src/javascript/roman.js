import {
  __,
  always,
  compose,
  find,
  gte,
  identity,
  ifElse,
  join,
  map,
  prepend,
  subtract
} from 'ramda'

const numeralMap = new Map([
  [1000, 'M'],
  [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'],
  [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'],
  [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
])

export const toRomanChar = num =>
  numeralMap.get(num)

export const getHighNum = num =>
  compose(
    find(gte(num)),
    Array.from
  )(numeralMap.keys())

export const removeHigh = num =>
  compose(
    ifElse(
      isNaN,
      always(undefined),
      identity
    ),
    subtract
  )(...[num, getHighNum(num)])

export class OutOfBoundsException extends Error {
  constructor() {
    super('number must be greater than zero')
  }
}

const throwOoBE = () => {
  throw new OutOfBoundsException()
}

export const percutiet = num =>
  num <= 0
    ? []
    : prepend(
      getHighNum(num),
      percutiet(removeHigh(num))
    )

export const toRomanString = num =>
  ifElse(
    gte(__, 0),
    compose(
      join(''),
      map(toRomanChar),
      percutiet
    ),
    throwOoBE
  )(num)
