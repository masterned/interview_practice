import {
  __,
  compose,
  curry,
  equals,
  filter,
  map,
  modulo,
  prop,
  range,
  zip
} from 'ramda'

export const isEven = compose(
  equals(0),
  modulo(__, 2)
)

export const keyValuePairs = a =>
  zip(range(0, length(a)), a)


export const filterIndexes = curry(
  (f, a) =>
    compose(
      map(prop(1)),
      filter(compose(f, prop(0))),
      keyValuePairs
    )(a)
)
