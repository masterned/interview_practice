import {
  ENGLISH_LETTER_COUNT,
  bindCharacterCode,
  caesar,
  fromCharacterCode,
  isLowercaseLetter,
  isUppercaseLetter,
  rotateLetter,
  toCharacterCode
} from '../../src/javascript/caesar.js'

describe('bindCharacterCode', () => {
  it('binds the normalized charater code to the number of characters', () => {
    const bindToEnglishLetters = bindCharacterCode(ENGLISH_LETTER_COUNT)

    expect(bindToEnglishLetters(29)).toBe(3)

    expect(bindToEnglishLetters(-1)).toBe(25)
  })
})

describe('toCharacterCode', () => {
  it('returns the ascii value of a character', () => {
    expect(toCharacterCode('a')).toBe(97)

    expect(toCharacterCode('A')).toBe(65)
  })
})

describe('fromCharacterCode', () => {
  it('returns the character of the ascii value', () => {
    expect(fromCharacterCode(97)).toBe('a')

    expect(fromCharacterCode(65)).toBe('A')
  })
})

describe('isUppercaseLetter', () => {
  it('returns true if the character code is an uppercase letter', () => {
    expect(isUppercaseLetter(toCharacterCode('A'))).toBe(true)
  })

  it('returns false otherwise', () => {
    expect(isUppercaseLetter(toCharacterCode('a'))).toBe(false)
  })
})

describe('isLowercaseLetter', () => {
  it('returns true is the character code is an lowercase letter', () => {
    expect(isLowercaseLetter(toCharacterCode('a'))).toBe(true)
  })

  it('returns false otherwise', () => {
    expect(isLowercaseLetter(toCharacterCode('A'))).toBe(false)
  })
})

describe('rotateLetter', () => {
  const english_rotate = rotateLetter(bindCharacterCode(ENGLISH_LETTER_COUNT))

  it('returns the input when give a rotation of 0', () => {
    expect(english_rotate(0, toCharacterCode('a'))).toBe(toCharacterCode('a'))
  })

  it('returns the next letter in the alphabet when rotation is 1', () => {
    expect(english_rotate(1, toCharacterCode('a'))).toBe(toCharacterCode('b'))
  })

  it('loops around to the front of the alphabet', () => {
    expect(english_rotate(2, toCharacterCode('z'))).toBe(toCharacterCode('b'))
  })

  it('works on upper case', () => {
    expect(english_rotate(1, toCharacterCode('C'))).toBe(toCharacterCode('D'))
  })

  it('returns the input when rotation is number of letters', () => {
    expect(english_rotate(26, toCharacterCode('a'))).toBe(toCharacterCode('a'))
  })

  it('handles negative values', () => {
    expect(english_rotate(-6, toCharacterCode('h'))).toBe(toCharacterCode('b'))
  })

  it('ignores numbers', () => {
    expect(english_rotate(12, toCharacterCode('8'))).toBe(toCharacterCode('8'))
  })

  it('ignores spaces', () => {
    expect(english_rotate(12, toCharacterCode(' '))).toBe(toCharacterCode(' '))
  })

  it('ignores punctuation', () => {
    expect(english_rotate(12, toCharacterCode('.'))).toBe(toCharacterCode('.'))
  })
})

describe('caesar', () => {
  it('works on a string', () => {
    expect(caesar('HelloWorld', 3)).toStrictEqual('KhoorZruog')
  })

  it('leaves non-alphabet characters in place', () => {
    expect(caesar('hello world', 3)).toBe('khoor zruog')

    expect(caesar('Hello, World!', 3)).toBe('Khoor, Zruog!')

    expect(caesar('42 is the answer to the Universe.', -1)).toBe('42 hr sgd zmrvdq sn sgd Tmhudqrd.')

    expect(caesar('The quick brown fox jumps over the lazy dog.', 13)).toBe('Gur dhvpx oebja sbk whzcf bire gur ynml qbt.')
  })

  it('can handle character sets of different lengths', () => {
    expect(caesar('a bad cab', 7, 5)).toBe('c dca ecd')
  })
})
