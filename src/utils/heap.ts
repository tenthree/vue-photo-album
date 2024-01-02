export type Comparator<T> = (a: T, b: T) => number

type Ranker<T> = (e: T) => number

export function rankingFunctionComparator<T>(rank: Ranker<T>) {
  return (a: T, b: T) => rank(b) - rank(a)
}

export default class Heap<T> {
  protected heap: T[] = []
  protected n = 0

  constructor(protected comparator: Comparator<T>) {}

  protected greater(i: number, j: number): boolean {
    return this.comparator(this.heap[i], this.heap[j]) < 0
  }

  protected swap(i: number, j: number): void {
    // this.heap[j] = this.heap.splice(i, 1, this.heap[j])[0]
    const temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }

  protected swim(i: number): void {
    let k = i
    let k2 = Math.floor(k / 2)
    while (k > 1 && this.greater(k2, k)) {
      this.swap(k2, k)
      k = k2
      k2 = Math.floor(k / 2)
    }
  }

  protected sink(i: number): void {
    let k = i
    let k2 = k * 2
    while (k2 <= this.n) {
      if (k2 < this.n && this.greater(k2, k2 + 1)) {
        k2 += 1
      }
      if (!this.greater(k, k2)) {
        break
      }
      this.swap(k, k2)
      k = k2
      k2 = k * 2
    }
  }

  public push(element: T) {
    this.n += 1
    this.heap[this.n] = element
    this.swim(this.n)
  }

  public pop() {
    if (this.n === 0) {
      return undefined
    }
    this.swap(1, this.n)
    this.n -= 1
    const max = this.heap.pop()
    this.sink(1)
    return max
  }

  public get size() {
    return this.n
  }
}
