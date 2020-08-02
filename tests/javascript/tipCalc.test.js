import {
  calcTip
} from '../src/tipCalc'


describe('calcTip', () => {
  it('properly calculates a Spencer tip', () => {
    expect(calcTip(25.32))
      .toBe(5.68)
  })
})
