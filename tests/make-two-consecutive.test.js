import {
  canMakeBeautiful,
  isBeautiful,
  toPossibility,
  allMostPerms
} from '../src/make-two-consecutive'

describe('toPossibility', () => {
  it('returns "Possible" when passed `true`', () => {
    expect(toPossibility(true))
      .toBe('Possible')
  })

  it('returns "Impossible" when passed `false`', () => {
    expect(toPossibility(false))
      .toBe('Impossible')
  })
})

describe('isBeautiful', () => {
  it('returns true if the string contains two consecutive equal characters', () => {
    expect(isBeautiful('KEEP'))
      .toBe(true)

    expect(isBeautiful('ZZZZZ'))
      .toBe(true)

    expect(isBeautiful('TTORR'))
      .toBe(true)
  })

  it('returns false otherwise', () => {
    expect(isBeautiful('A'))
      .toBe(false)

    expect(isBeautiful('GH'))
      .toBe(false)

    expect(isBeautiful('ABCABCBX'))
      .toBe(false)
  })
})

describe('allMostPerms', () => {
  it('returns all possible strings when a character is removed from the parent string', () => {
    expect(allMostPerms('spencer'))
      .toStrictEqual([
        'pencer',
        'sencer',
        'spncer',
        'specer',
        'spener',
        'spencr',
        'spence'
      ])
  })
})

describe('canMakeBeautiful', () => {
  it('returns "Possible" if the string isBeautiful after removing a character', () => {
    expect(canMakeBeautiful('AABB'))
      .toBe("Possible")

    expect(canMakeBeautiful('BAB'))
      .toBe("Possible")
  })

  it('returns "Impossible" otherwise', () => {
    expect(canMakeBeautiful('BCAB'))
      .toBe("Impossible")

    expect(canMakeBeautiful('BB'))
      .toBe("Impossible")

    expect(canMakeBeautiful('A'))
      .toBe("Impossible")
  })
})
