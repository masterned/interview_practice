import {
  curry,
  reduce,
  map as genMap,
  toString as genToString,
  chain as genChain,
  ap as genAp,
  lift2 as genLift2
} from ''

class Either {
  constructor(val) {
    this.__val = val
  }

  toString() {
    return this.__val.toString()
  }

  isLeft() {
    return this instanceof Left
  }

  isRight() {
    return this instanceof Right
  }
}

class Left extends Either {
  constructor(val) {
    super(val)
  }

  map() {
    return this
  }

  toString() {
    return `Left(${super.toString()})`
  }

  static of(val) {
    return new Left(val)
  }

  join() {
    return this
  }

  chain() {
    return this
  }

  ap() {
    return this
  }
}

class Right extends Either {
  constructor(val) {
    super(val)
  }

  map(fn) {
    return new Right(fn(this.__val))
  }

  toString() {
    return `Right(${super.toString()})`
  }

  static of(val) {
    return new Right(val)
  }

  join() {
    return (this.__val instanceof Left || this.__val instanceof Right)
      ? this.__val
      : this
  }

  chain(fn) {
    return fn(this.__val)
  }

  ap(otherEither) {
    return this.map(otherEither.__val)
  }
}

export const left = val => Left.of(val)

export const right = val => Right.of(val)

export const either = curry((leftFn, rightFn, e) =>
  e instanceof Left ? leftFn(e.__val) : rightFn(e.__val))

export const map = genMap

/**
 * @param {Either} either 
 */
export const isLeft = either => either.isLeft()

/**
 * @param {Either} either 
 */
export const isRight = either => either.isRight()

export const fromEither = curry((defVal, either) => either instanceof Right ? either : defVal)

export const lefts = reduce((array, e) => isLeft(e) ? push(e.__val, array) : array, [])

export const rights = reduce((array, e) => isRight(e) ? push(e.__val, array) : array, [])

export const tagBy = curry((predicate, value) => predicate(value) ? right(val) : left(val))

// I haven't the slightest idea if this would work...
export const encase = curry((riskyFn, arg) => {
  try {
    const value = riskyFn(arg)
    return right(value)
  } catch (error) {
    return left(error)
  }
})

export const toString = genToString

export const chain = genChain

export const ap = genAp

export const lift2 = genLift2
