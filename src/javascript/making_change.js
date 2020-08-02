const { Arrays, Objects, Functions } = require('../../util/Utils')
const { prop } = Objects
const { flatMap, push } = Arrays
const { compose, until } = Functions

const making_change = (() => {
  /**
   * constructs a Ledger
   * @param {number} amount remaining amount
   * @param {[number]} purse collected coins
   */
  const Ledger = (amount, purse = []) => ({ amount, purse })

  const NoSolutionError = Error('no solution possible')

  const least = arr => Math.min(...arr)

  /**
   * filters out branches leading to permutations of existing branches
   * @param {[number]} denoms
   * @param {Ledger} ledger
   * @returns set of denoms containing coins <= smallest coin in ledger's purse
   */
  const removeMisleads = (denoms, ledger) =>
    ledger.purse === []
      ? denoms
      : denoms.filter(coin => coin <= least(ledger.purse))

  /**
   * creates an array of all possible next Ledgers based upon the current Ledger and coin denominations
   * @param {[number]} denoms
   * @returns {function(Ledger): [Ledger]}
   */
  const branchDenoms = denoms => ledger => {
    let branches = []

    removeMisleads(denoms, ledger).some(coin => { //* on deep levels, ignore coins greater than least grab
      if (coin === ledger.amount) {
        branches = [Ledger(0, push(coin, ledger.purse))]

        return true //* basically breaks out of the `some`
      }
      if (coin < ledger.amount) branches = push(Ledger(ledger.amount - coin, push(coin, ledger.purse)), branches)

      return false
    })

    return branches
  }

  const findSolution = branches => {
    if (branches.length === 0) throw NoSolutionError

    return branches.find(ledger => ledger.amount === 0)
  }

  const descSort = arr => arr.sort((a, b) => b - a)

  const toChange = denoms => amount => {
    if (amount < 0 || !denoms || denoms.filter(coin => coin <= amount).length === 0) throw NoSolutionError

    return compose(
      descSort,
      prop('purse'),
      findSolution,
      until(findSolution, flatMap(branchDenoms(denoms)))
    )([Ledger(amount)])
  }

  const dynamicFindSolution = denoms => amount => {
    if (amount < 0 || !denoms || denoms.filter(coin => coin <= amount).length === 0) throw NoSolutionError
    denoms.sort()
    const solutions = (new Array(amount + 1)).fill([])
    const minCoins = (new Array(amount + 1)).fill(amount + 1)
    minCoins[0] = 0
    solutions.forEach((_, s) => {
      denoms.forEach(coin => {
        if (coin <= s)
          if (minCoins[s] > (1 + minCoins[s - coin])) {
            minCoins[s] = 1 + minCoins[s - coin]
            solutions[s] = push(coin, solutions[s - coin])
          }
      })
    })
    if (minCoins[amount] > amount) throw NoSolutionError

    return descSort(solutions[amount])
  }

  return {
    Ledger,
    NoSolutionError,
    branchDenoms,
    descSort,
    dynamicFindSolution,
    findSolution,
    removeMisleads,
    toChange
  }
})()

module.exports = making_change
