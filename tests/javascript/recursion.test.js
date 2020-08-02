import {
  bubble,
  bubbleSort,
  listMoves,
  perfectScore,
  squList,
  strLen
} from '../src/recursion'

import {
  reverse
} from 'ramda'

describe('strLen', () => {
  it('returns zero when passed an empty string', () => {
    expect(strLen(''))
      .toBe(0)
  })

  it('properly returns the length of a given string', () => {
    expect(strLen('dictionary'))
      .toBe(10)

    expect(strLen('encyclopedia'))
      .toBe(12)
  })
})

describe('squList', () => {
  it('returns zero on an empty list', () => {
    expect(squList([]))
      .toBe(0)
  })

  it('sums the squares of all the numbers in a single level', () => {
    expect(squList([1, 2, 3]))
      .toBe(14)
  })

  it('flattens the array before computation', () => {
    expect(squList([[[[[[[[[1]]]]]]]]]))
      .toBe(1)

    expect(squList([10, [[10], 10], [10]]))
      .toBe(400)
  })
})

describe('bubbleSort', () => {
  describe('bubble', () => {
    it('compares the next two values in the list and swaps them if they are out of order', () => {
      expect(bubble([[3, 2, 1], true]))
        .toStrictEqual([[2, 3, 1], true])
    })
  })

  describe('sort', () => {
    it('returns an empty array when passed an empty array', () => {
      expect(bubbleSort([]))
        .toStrictEqual([])
    })

    const sorted = [1, 2, 4, 5, 8]

    it.only('returns a sorted version of the given array', () => {
      expect(bubbleSort([5, 1, 4, 2, 8]))
        .toStrictEqual([1, 2, 4, 5, 8])

      expect(bubbleSort(sorted))
        .toStrictEqual(sorted)

      expect(bubbleSort(reverse(sorted)))
        .toStrictEqual(sorted)
    })
  })
})

describe('hanoi', () => {
  describe('perfectScore', () => {
    it('returns the number of fewest possible moves on a tower of hanoi of a given height', () => {
      expect(perfectScore(3))
        .toBe(7)

      expect(perfectScore(8))
        .toBe(255)

      expect(perfectScore(0))
        .toBe(0)
    })

    it('throws an error when passed a number less than zero', () => {
      expect(() => perfectScore(-1))
        .toThrow()
    })
  })

  describe('listMoves', () => {
    it('returns an empty array when passed zero', () => {
      expect(listMoves(0))
        .toStrictEqual([])
    })

    it('throws an error when passed a number less than zero', () => {
      expect(() => listMoves(-2))
        .toThrow()
    })

    it('returns an array of strings listing the correct moves for a perfect score', () => {
      expect(listMoves(4))
        .toStrictEqual([
          'a -> b',
          'a -> c',
          'b -> c',
          'a -> b',
          'c -> a',
          'c -> b',
          'a -> b',
          'a -> c',
          'b -> c',
          'b -> a',
          'c -> a',
          'b -> c',
          'a -> b',
          'a -> c',
          'b -> c'
        ])
    })
  })
})
