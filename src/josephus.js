import {
  add,
  compose,
  curry,
  multiply,
  range,
  subtract
} from 'ramda'

const {
  floor,
  log2,
  pow
} = Math

//! this can be optimized
export const josephus = n => {
  if (n < 0) throw new Error()

  const army = range(0, n)

  while (army.length > 1) {
    const skip = army.shift()
    army.push(skip)
    army.shift()
  }

  return army
}

//* n - 2 ^ floor(log2(n)) * 2 + 1
const formula = n => compose(
  add(1),
  multiply(2),
  subtract(n),
  curry(pow)(2),
  floor,
  log2
)(n)

export const debug = {
  formula
}
