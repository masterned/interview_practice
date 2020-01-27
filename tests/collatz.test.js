import {
  debug,
  sequence
} from '../src/collatz'

const {
  step
} = debug

describe('step', () => {
  it('divides by 2 if even', () => {
    expect(step(4))
      .toBe(2)
  })

  it('multiplies by 3 and adds one if odd', () => {
    expect(step(3))
      .toBe(10)
  })
})

describe('sequence', () => {
  it('returns zero when passed one', () => {
    expect(sequence(1))
      .toBe(0)
  })

  it('returns the number of steps in a collatz squence of a given starting point', () => {
    expect(sequence(12))
      .toBe(9)

    expect(sequence(1000000))
      .toBe(152)
  })

  it('throws an error when passed a number less than or equal to zero', () => {
    expect(() => sequence(0))
      .toThrow(Error)

    expect(() => sequence(-15))
      .toThrow(Error)
  })
})
