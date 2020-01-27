import {
  map,
  range
} from 'ramda'

const {
  random
} = Math

//! there really is not a good way to test somthing like this
//* as far as I know...
export const roll = times => sides =>
  map(
    () => random * sides,
    range(0, times)
  )
