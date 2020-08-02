import {
  LinkedList,
  fromArray,
  toArray,
  push,
  pop,
  peek,
  reverse,
  dequeue
} from '../src/LinkedList'

const ll = fromArray(['foo', 'bar', 'baz'])

describe('LinkedList', () => {
  it('push: returns a new list with a new value pushed onto the stack', () => {
    expect(push('zoom')(ll))
      .toStrictEqual(fromArray(['zoom', 'foo', 'bar', 'baz']))
    expect(push('foo')(null))
      .toStrictEqual(LinkedList('foo'))
  })

  it('pop: returns a new list containing the tail values', () => {
    expect(pop(ll))
      .toStrictEqual({ value: 'bar', next: { value: 'baz', next: null } })
  })

  it('peek: returns the value at the top of the stack', () => {
    expect(peek(ll))
      .toBe('foo')
  })

  it('fromArray: creates a linked list from an array', () => {
    expect(fromArray(['foo', 'bar', 'baz']))
      .toStrictEqual({ value: 'foo', next: { value: 'bar', next: { value: 'baz', next: null } } })
  })

  it('toArray: creates an array from a linked list', () => {
    expect(toArray(ll))
      .toStrictEqual(['foo', 'bar', 'baz'])
    expect(toArray(null))
      .toStrictEqual([])
  })

  it('reverse: creates a new reversed version of the list', () => {
    expect(reverse(ll))
      .toStrictEqual({ value: 'baz', next: { value: 'bar', next: { value: 'foo', next: null } } })
    expect(ll)
      .toStrictEqual({ value: 'foo', next: { value: 'bar', next: { value: 'baz', next: null } } })
    expect(reverse(null))
      .toStrictEqual(null)
  })

  it('dequeue: returns the first inserted value of the list', () => {
    expect(dequeue(ll))
      .toStrictEqual({ value: 'foo', next: { value: 'bar', next: null } })
    expect(dequeue(null))
      .toStrictEqual(null)
  })
})
