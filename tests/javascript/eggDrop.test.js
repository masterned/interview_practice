import {
  MAX_SAFE_LEVEL,
  eggBreaksAt,
  even,
  pow2,
  radix,
  simulate
} from '../src/eggDrop'

describe('SAFE_LEVEL', () => {
  it('is a random number between 0 (inclusive) and 100 (exclusive)', () => {
    expect(MAX_SAFE_LEVEL).toBeGreaterThanOrEqual(0)
    expect(MAX_SAFE_LEVEL).toBeLessThan(100)
  })
})

describe('eggBreaksAt', () => {
  it('returns whether the egg breaks after dropped at the given height', () => {
    expect(eggBreaksAt(MAX_SAFE_LEVEL)).toBe(false)

    expect(eggBreaksAt(MAX_SAFE_LEVEL + 1)).toBe(true)
  })
})

describe('simulate', () => {
  it('uses the `radix` algoritm, a building with 100 floors, and 2 eggs by default', () => {
    const mock = jest.fn()
    simulate(mock)
    expect(mock).toHaveBeenCalledWith(new Array(100).fill(0), 2)
  })

  describe('even', () => {
    it('is an algorithm based upon even numbers', () => {
      expect(simulate(even, 10, 2))
        .toStrictEqual([2, 3, 3, 4, 4, 5, 5, 6, 6, 7])
    })
  })

  describe.skip('pow2', () => {
    it('is an algoritm based upon powers of two', () => {
      expect(simulate(pow2, 10, 2))
        .toStrictEqual([2, 3, 3, 4, 5, 6, 7, 5, 6, 7])
    })
  })

  describe('radix', () => {
    it('is a radix-like algorithm', () => {
      expect(simulate(radix, 10, 2))
        .toStrictEqual([3, 4, 5, 6, 7, 8, 9, 10, 10, 3])
    })
  })

  describe.skip('dynamic', () => {
    it('is a dynamic programming approach', () => {

    })
  })
})
