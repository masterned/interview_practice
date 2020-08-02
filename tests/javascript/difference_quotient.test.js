import { gcf, separate_variable_and_expression } from '../src/difference_quotient'

describe('gcf', () => {
  it('returns the greatest common factor between two numbers', () => {
    expect(gcf(12, 8))
      .toBe(4)

    expect(gcf(182664, 154875))
      .toBe(177)
  })

  it('returns 1 when there are no other common factors', () => {
    expect(gcf(23, 17))
      .toBe(1)

    expect(gcf(5, 46))
      .toBe(1)
  })

  it('returns the greatest commong factor between multiple numbers', () => {
    expect(gcf(182664, 154875, 137688))
      .toBe(3)
  })
})

describe('separate_variable_and_expression', () => {
  it('returns an array containing the variable and expression of the passed function', () => {
    expect(separate_variable_and_expression('x => x ^ x'))
      .toStrictEqual(['x', 'x ^ x'])
  })

})