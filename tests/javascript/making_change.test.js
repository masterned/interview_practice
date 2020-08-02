const { Ledger, branchDenoms, removeMisleads, toChange, NoSolutionError, dynamicFindSolution } = require('../src/making_change')
const { testStrictEqual: tse, testToThrow: ttt } = require('../../util/Utils').Tests

//* === branchDenoms ===
// const testBrancher = branchDenoms([10, 5, 1])

// tse('branches: none', testBrancher(Ledger(0)), [])

// tse('branches: exact denom', testBrancher(Ledger(5)), [{ purse: [5], amount: 0 }])

// tse('branches: some hits', testBrancher(Ledger(9)), [{ purse: [5], amount: 4 }, { purse: [1], amount: 8 }])

// tse('branches: second pass', testBrancher(testBrancher(Ledger(9))[0]), [{ purse: [5, 1], amount: 3 }])

// tse('branches: no denoms', branchDenoms([])(Ledger(42)), [])

//* === removeMisleads ===
// tse('removeMisleads: basic', removeMisleads([25, 10, 5, 1], Ledger(14, [10])), [10, 5, 1])

// tse('removeMisleads: empty purse', removeMisleads([25, 10, 5, 1], Ledger(14)), [25, 10, 5, 1])

//* === removeDeadends ===
// tse('removeDeadends: basic', removeDeadends([25])([Ledger(1), Ledger(28), Ledger(32), Ledger(18), Ledger(4)]), [Ledger(28), Ledger(32)])

// tse('removeDeadends: empty branches', removeDeadends([1, 5, 10])([]), [])

//* === toChange ===
//* == to US coins ==
const us = dynamicFindSolution([1, 5, 10, 25])

tse('toChange: penny', us(1), [1])

tse('toChange: quarter', us(25), [25])

tse('toChange: different coins', us(40), [25, 10, 5])

tse('toChange: multi same', us(100), [25, 25, 25, 25])

tse('toChange: multi mixed', us(73), [25, 25, 10, 10, 1, 1, 1])

//* == arbatrary coin denominations ==
tse('toChange: homogeneous greedless', dynamicFindSolution([1, 5, 10, 21, 25])(63), [21, 21, 21])

tse('toChange: heterogeneous greedless', dynamicFindSolution([1, 4, 15, 20, 50])(23), [15, 4, 4])

tse('toChange: heap crusher', dynamicFindSolution([1, 2, 5, 10, 20, 50, 100])(999), [100, 100, 100, 100, 100, 100, 100, 100, 100, 50, 20, 20, 5, 2, 2])

//* == error throwing ==
// ttt('toChange: no possible coin', () => dynamicFindSolution([5, 10])(3), NoSolutionError)

// ttt('toChange: no combo of coins', () => dynamicFindSolution([5, 10])(94), NoSolutionError)

// ttt('toChange: negative input', () => dynamicFindSolution([1, 2, 5])(-5), NoSolutionError)

//* == Spencer's tests ==
// tse('toChange: greedy dead-ends', dynamicFindSolution([2, 10, 15])(16), [10, 2, 2, 2])