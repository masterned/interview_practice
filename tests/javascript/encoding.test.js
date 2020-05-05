import {
  debug,
  decode,
  encode
} from '../src/encoding'

const {
  decodeGroup,
  isGreaterThan1,
  separateAdjacentGroups,
  separateEncodedGroups,
  separateTimesFromChar,
  toEncodedGroup,
  wrap
} = debug

describe('wrap', () => {
  it('returns a value wrapped in an array', () => {
    expect(wrap(42))
      .toStrictEqual([42])

    expect(wrap('hip hip'))
      .toStrictEqual(['hip hip'])

    expect(wrap([]))
      .toStrictEqual([[]])
  })
})

describe('toEncodedGroup', () => {
  it('encodes a group of characters', () => {
    expect(toEncodedGroup('FFFF'))
      .toBe('4F')
  })
})

describe('separateAdjacentGroups', () => {
  it('breaks a string into an array of runs of adjacent characters', () => {
    expect(separateAdjacentGroups('AAAABBBCCCCD'))
      .toStrictEqual(['AAAA', 'BBB', 'CCCC', 'D'])
  })
})

describe('isGreaterThan1', () => {
  it('returns true if the value is greater than one', () => {
    expect(isGreaterThan1(2))
      .toBe(true)
  })

  it('returns false otherwise', () => {
    expect(isGreaterThan1(0))
      .toBe(false)

    expect(isGreaterThan1(1))
      .toBe(false)
  })
})

describe('encode', () => {
  it('returns an empty string when passed an empty string', () => {
    expect(encode(''))
      .toBe('')
  })

  it('returns the input string if the string contains only single characters', () => {
    expect(encode('XYZ'))
      .toBe('XYZ')
  })

  it('properly encodes a string of a single repeating character', () => {
    expect(encode('AAAA'))
      .toBe('4A')
  })

  it('properly converts a string of mixed repeating characters', () => {
    expect(encode('ABBBBCCDDEEEEEE'))
      .toBe('A4B2C2D6E')
  })

  it('properly handles whitespace characters', () => {
    expect(encode('  AA   B CCC'))
      .toBe('2 2A3 B 3C')
  })
})

describe('separateTimesFromChar', () => {
  it('returns an array containing the character and its arity', () => {
    expect(separateTimesFromChar('4F'))
      .toStrictEqual(['F', 4])
  })
})

describe('decodeGroup', () => {
  it('decodes an encoded string into a string of recurring characters', () => {
    expect(decodeGroup('5T'))
      .toBe('TTTTT')
  })
})

describe('separateEncodedGroups', () => {
  it('breaks the string into an array of encoded groups', () => {
    expect(separateEncodedGroups('A4B2C2D6E'))
      .toStrictEqual(['A', '4B', '2C', '2D', '6E'])

    expect(separateEncodedGroups('17A'))
      .toStrictEqual(['17A'])
  })
})

describe('decode', () => {
  it('returns an empty string when passed an empty string', () => {
    expect(decode(''))
      .toBe('')
  })

  it('returns the input string when no duplication is necessary', () => {
    expect(decode('XYZ'))
      .toBe('XYZ')
  })

  it('properly decodes a single repeating character string', () => {
    expect(decode('4A'))
      .toBe('AAAA')
  })

  it('properly decodes a string of mixed characters', () => {
    expect(decode('A4B2C2D6E'))
      .toBe('ABBBBCCDDEEEEEE')
  })

  it('properly decodes whitespace characters', () => {
    expect(decode('2 2A3 B 3C'))
      .toBe('  AA   B CCC')
  })
})
