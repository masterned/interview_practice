import {
  __,
  compose,
  equals,
  gte,
  ifElse,
  inc,
  prop,
  until
} from 'ramda'

/**
 * if the number is even, returns half
 * otherwise, returns number times 3 plus 1
 * @param {number} num input
 */
const step = num =>
  num % 2 === 0
    ? num / 2
    : num * 3 + 1

/**
 * produces a Collatz sequence and returns number of iterations
 * @param {number} num starting number
 * @returns {number} number of steps
 */
export const sequence = ifElse(
  gte(__, 1),
  compose(
    prop(1),
    until(
      compose(
        equals(1),
        prop(0)
      ),
      args => [step(prop(0, args)), inc(prop(1, args))]
    ),
    n => [n, 0] // [number, iterations]
  ),
  () => {
    throw new Error('number must be greater than or equal to one')
  }
)

export const debug = {
  step
}
