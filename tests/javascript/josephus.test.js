import {
  debug,
  josephus
} from '../src/josephus'

const {
  formula
} = debug

describe('formula', () => {
  it('returns the index of the survivor in a josephus circle', () => {
    expect(formula(17))
      .toBe(3)

    expect(formula(32))
      .toBe(1)

    expect(formula(100))
      .toBe(73)

    expect(formula(7))
      .toBe(7)
  })
})

describe('josephus', () => {
  it('returns an array consisting of the last survivor of a josephus circle', () => {
    expect(josephus(7))
      .toStrictEqual([6])

    expect(josephus(17))
      .toStrictEqual([2])

    expect(josephus(1))
      .toStrictEqual([0])
  })

  it('returns an empty array when passed zero', () => {
    expect(josephus(0))
      .toStrictEqual([])
  })

  it('throws an error when passed a number less than zero', () => {
    expect(() => josephus(-1))
      .toThrow()
  })
})
