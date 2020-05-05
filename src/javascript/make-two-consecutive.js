import {
  __,
  any,
  compose,
  equals,
  groupWith,
  join,
  length,
  map,
  range,
  remove
} from 'ramda'

export const toPossibility = boolean =>
  boolean
    ? 'Possible'
    : 'Impossible'

export const isBeautiful = compose(
  any(group => length(group) >= 2),
  groupWith(equals)
)

export const allMostPerms = string =>
  map(
    compose(
      join(''),
      remove(__, 1, string)
    ),
    compose(
      range(0),
      length
    )(string)
  )

export const canMakeBeautiful = compose(
  toPossibility,
  any(isBeautiful),
  allMostPerms
)
