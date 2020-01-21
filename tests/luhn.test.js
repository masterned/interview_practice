import {
  clamp,
  doubleSeconds,
  isDivisible,
  isOnlyNums,
  isValid,
  removeWhitespace
} from '../src/luhn'

describe('isDivisible', () => {
  it('returns whether one number is divisible by another', () => {
    expect(isDivisible(9)(54))
      .toBe(true)

    expect(isDivisible(3)(21))
      .toBe(true)

    expect(isDivisible(21)(18))
      .toBe(false)
  })
})

describe('clamp', () => {
  it('clamps a number between 0 and 9 by subtracting 9 when larger than 9 (domain: 2-18)', () => {
    expect(clamp(18))
      .toBe(9)

    expect(clamp(10))
      .toBe(1)

    expect(clamp(2))
      .toBe(2)
  })
})

describe('isOnlyNums', () => {
  it('returns whether a string contains only numerical characters', () => {
    expect(isOnlyNums('2893745'))
      .toBe(true)

    expect(isOnlyNums('Hello World!'))
      .toBe(false)

    expect(isOnlyNums('123.425'))
      .toBe(false)

    expect(isOnlyNums('1425235e192'))
      .toBe(false)
  })
})

describe('removeWhitespace', () => {
  it('removes all whitespace from a string', () => {
    expect(removeWhitespace('twas brillig and the slithy toves'))
      .toStrictEqual('twasbrilligandtheslithytoves')

    expect(removeWhitespace('   Grand         Canyon   '))
      .toStrictEqual('GrandCanyon')

    expect(removeWhitespace('there\tbe\ttabs\nand\treturns'))
      .toStrictEqual('therebetabsandreturns')
  })
})

describe('doubleSeconds', () => {
  it('doubles every second digit starting from the right', () => {
    expect(doubleSeconds([1, 2, 3, 4, 5, 6]))
      .toStrictEqual([2, 2, 6, 4, 10, 6])

    expect(doubleSeconds([4, 5, 6, 7, 8]))
      .toStrictEqual([4, 10, 6, 14, 8])
  })
})

describe('luhn validity checksum', () => {
  it('returns false if the string is a single digit, including zero (spaces are ignored in character count)', () => {
    expect(isValid('1'))
      .toBe(false)

    expect(isValid('0'))
      .toBe(false)

    expect(isValid(' 0'))
      .toBe(false)
  })

  it('returns true for a luhn that remains valid when reversed', () => {
    expect(isValid('059'))
      .toBe(true)
  })

  it('returns true for a luhn that becomes invalid if reversed', () => {
    expect(isValid('59'))
      .toBe(true)
  })

  it('properly checks a Canadian SIN', () => {
    expect(isValid('055 444 285'))
      .toBe(true)

    expect(isValid('055 444 286'))
      .toBe(false)
  })

  it('returns false if the string contains illegal characters, even if valid otherwise', () => {
    expect(isValid('055a 444 285'))
      .toBe(false)

    expect(isValid('059a'))
      .toBe(false)

    expect(isValid('055-444-285'))
      .toBe(false)

    expect(isValid('055£ 444$ 285'))
      .toBe(false)

    expect(isValid(':9'))
      .toBe(false)
  })

  it('returns true for strings containing only zeros', () => {
    expect(isValid('0000 0'))
      .toBe(true)
  })

  it('properly checks a credit card number', () => {
    expect(isValid('4111 1111 1111 1111'))
      .toBe(true)

    expect(isValid('8273 1232 7352 0569'))
      .toBe(false)
  })

  it('properly check an arbitrary number string with an even number of digits', () => {
    expect(isValid('095 245 88'))
      .toBe(true)
  })
})
