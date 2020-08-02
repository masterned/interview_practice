export const separate_variable_and_expression = f =>
  f.toString()
    .split('=>')
    .map(string => string.trim())
    .slice(0, 2)

export const pass_new_variable_into_function = f => v => {
  const [variable, expression] = separate_variable_and_expression(f)

  return expression.replace(new RegExp(variable, 'g'), `(${v})`)
}

export class Fraction {
  constructor(numerator, denominator) {
    this.numerator = numerator.toString()
    this.denominator = denominator.toString()
  }

  toString() {
    if (this.denominator.length > this.numerator.length)
      return this.numerator.padStart(round(this.denominator.length / 2), '_').padEnd(this.denominator.length, '_') + '\n' + this.denominator

    return `__${this.numerator}__` + '\n' + this.denominator.padStart(round(this.numerator.length / 2 + 2), ' ')
  }
}

export const differenceQuotient = f => {
  const pass_to_f = pass_new_variable_into_function(f)

  return new Fraction(`(${pass_to_f('x + f')}) - (${pass_to_f('x')})`, 'h')
}

const {
  abs,
  round,
  max,
  min
} = Math

export const euclid = (a, b) =>
  a === b
    ? a
    : euclid(max(a, b) - min(a, b), min(a, b))

export const gcf = (...numbers) =>
  numbers.reduce((a, b) => euclid(abs(a), abs(b)))

console.log(differenceQuotient('x => x + 2').toString())
