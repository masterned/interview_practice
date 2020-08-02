import {
  filterIndexes,
  isEven
} from '../../util/Utils'

describe('isEven', () => {
  it('returns true if the number passed in is even', () => {
    expect(isEven(42))
      .toBe(true)
  })

  it('returns false otherwise', () => {
    expect(isEven(33))
      .toBe(false)
  })
})

const exampleArray = ['a', 'b', 'c', 'd', 'e']

describe('filterIndexes', () => {
  it('returns a new array consisting of the values that return true when passed into the passed function', () => {
    expect(filterIndexes(x => x > 1, exampleArray))
      .toStrictEqual(['c', 'd', 'e'])
  })

  it('is curried', () => {
    expect(filterIndexes(x => x < 2, exampleArray))
      .toStrictEqual(['a', 'b'])

    expect(filterIndexes(x => x > 2)(exampleArray))
      .toStrictEqual(['d', 'e'])
  })
})
