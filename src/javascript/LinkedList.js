import {
  compose,
  concat,
  reduceRight
} from 'ramda'

export const LinkedList = (value, next = null) => ({
  next,
  value
})

export const fromArray = array =>
  reduceRight((val, list) => push(val)(list), null, array)

export const toArray = list =>
  !list
    ? []
    : concat([list.value], toArray(list.next))

export const push = value => next =>
  LinkedList(value, next)

export const pop = list =>
  list && list.next

export const peek = list =>
  list && list.value

export const reverse = list => {
  if (!list) return list

  const helper = (input, output = null) =>
    !input
      ? output
      : helper(pop(input), push(peek(input))(output))

  return helper(list)
}

export const enqueue = push

// could speed this up from O(2n) to O(n)
export const dequeue = compose(
  reverse,
  pop,
  reverse
)
