import {
  OutOfBoundsException,
  getHighNum,
  removeHigh,
  toRomanChar,
  toRomanString
} from '../src/roman'

describe('toRomanChar', () => {
  it('returns a roman numeral mapping of a number', () => {
    expect(toRomanChar(5))
      .toBe('V')
  })

  it('properly handles the subtractive case', () => {
    expect(toRomanChar(9))
      .toBe('IX')
  })

  it('returns `undefined` when no matching roman numeral can be found', () => {
    expect(toRomanChar(0))
      .toBe(undefined)
  })
})

describe('getHighNum', () => {
  it('returns the highest number in the map less than the given number', () => {
    expect(getHighNum(5280))
      .toBe(1000)
  })

  it('returns `undefined` when no matching number can be found', () => {
    expect(getHighNum(0))
      .toBe(undefined)
  })
})

describe('removeHigh', () => {
  it('returns the number minus the highest number in the map', () => {
    expect(removeHigh(5280))
      .toBe(4280)
  })

  it('returns `undefined` when passed a number that cannot be reduced', () => {
    expect(removeHigh(0))
      .toBe(undefined)
  })
})

describe('toRomanString', () => {
  it('returns an empty string when passed zero', () => {
    expect(toRomanString(0))
      .toBe('')
  })

  it('properly translates strings consisting of the same character', () => {
    expect(toRomanString(30))
      .toBe('XXX')
  })

  it('properly handles strings consisting of different characters', () => {
    expect(toRomanString(1515))
      .toBe('MDXV')

    expect(toRomanString(2498))
      .toBe('MMCDXCVIII')
  })

  it('throws an `OutOfBoundsException` when passed a negative number', () => {
    expect(() => {
      toRomanString(-42)
    }).toThrow(OutOfBoundsException)
  })
})
