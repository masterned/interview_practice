import {
  compose,
  head,
  not,
  prepend,
  prop,
  tail,
  until
} from 'ramda'

const {
  isArray
} = Array

export const strLen = str =>
  str === ''
    ? 0
    : 1 + strLen(tail(str))

export const squList = list =>
  list.length === 0
    ? 0
    : isArray(list[0])
      ? squList(list[0]) + squList(list.slice(1))
      : list[0] ** 2 + squList(list.slice(1))

const LIST = 0
const SWAPPED = 1

export const bubble = ([list, swapped]) =>
  list.length <= 1
    ? [list, swapped]
    : head(list) > head(tail(list))
      ? [prepend(head(tail(list)), prepend(head(list), tail(tail(list)))), true]
      : bubble(tail(list), false)

export const bubbleSort = compose(
  prop(LIST),
  until(
    compose(
      not,
      prop(SWAPPED)
    ),
    bubble
  ),
  bubble,
  list => [list, false]
)

export class OutOfBoundsExpection extends Error {
  constructor() {
    super('number must be positive')
  }
}

export const throwOoBE = () => {
  throw new OutOfBoundsExpection()
}

export const perfectScore = num =>
  num < 0
    ? throwOoBE()
    : num === 0
      ? 0
      : perfectScore(num - 1) * 2 + 1

/**
 * solve for n-1 discs to middle,
 * move largest disc to final,
 * solve for n-1 discs to final
 * @param {number} num the height of the first tower of hanoi
 */
export const listMoves = num => {
  if (num < 0) throwOoBE()

  const moves = []

  const fn = (n, f, h, t) => {
    if (n !== 0) {
      fn(n - 1, f, t, h)
      moves.push(`${f} -> ${t}`)
      fn(n - 1, h, f, t)
    }
  }
  fn(num, 'a', 'b', 'c')

  return moves
}
