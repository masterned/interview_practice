import {
  __,
  ap,
  append,
  apply,
  compose,
  equals,
  groupWith,
  gt,
  head,
  identity,
  ifElse,
  join,
  last,
  length,
  map,
  match,
  pipe,
  repeat
} from 'ramda'

const {
  parseInt
} = Number

//==================================================

const wrap = append(__, [])

const toEncodedGroup = compose(
  join(''),
  ap([length, head]),
  wrap
)

const separateAdjacentGroups = groupWith(equals)

const isGreaterThan1 = gt(__, 1)

export const encode = pipe(
  separateAdjacentGroups,
  map(
    ifElse(
      pipe(
        length,
        isGreaterThan1
      ),
      toEncodedGroup,
      identity
    )
  ),
  join('')
)

//==================================================

const separateTimesFromChar = compose(
  ap([last, compose(parseInt, head)]),
  wrap
)

const decodeGroup = ifElse(
  s => /^\D/.test(s),
  identity,
  pipe(
    separateTimesFromChar,
    apply(repeat),
    join('')
  )
)

const separateEncodedGroups = match(/\d*./g)

export const decode = ifElse(
  equals(''),
  identity,
  pipe(
    separateEncodedGroups,
    map(decodeGroup),
    join('')
  )
)

//==================================================

export const debug = {
  decodeGroup,
  isGreaterThan1,
  separateAdjacentGroups,
  separateEncodedGroups,
  separateTimesFromChar,
  toEncodedGroup,
  wrap
}
