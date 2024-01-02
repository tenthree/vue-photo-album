export type GraphFunction<T> = (
  node: T
) => Array<{ neighbor: T; weight: number }>

type Matrix<T> = Map<T, Array<{ node: T; weight: number }>>

function computeShortestPath<T>(
  graph: GraphFunction<T>,
  pathLength: number,
  startNode: T,
  endNode: T
) {
  const matrix: Matrix<T> = new Map()

  const queue = new Set<T>()
  queue.add(startNode)

  for (let length = 0; length < pathLength; length += 1) {
    const currentQueue = [...queue.keys()]

    queue.clear()
    currentQueue.forEach((node) => {
      const accWeight = length > 0 ? matrix.get(node)![length].weight : 0

      graph(node).forEach(({ neighbor, weight }) => {
        let paths = matrix.get(neighbor)
        if (paths === undefined) {
          paths = []
          matrix.set(neighbor, paths)
        }

        const newWeight = accWeight + weight
        const nextPath = paths[length + 1]
        if (
          nextPath === undefined ||
          (nextPath.weight > newWeight &&
            (nextPath.weight / newWeight > 1.0001 || node < nextPath.node))
        ) {
          paths[length + 1] = { node, weight: newWeight }
        }

        if (length < pathLength - 1 && neighbor !== endNode) {
          queue.add(neighbor)
        }
      })
    })
  }

  return matrix
}

function reconstructShortestPath<T>(
  matrix: Matrix<T>,
  pathLength: number,
  endNode: T
) {
  const path = [endNode]
  for (let node = endNode, length = pathLength; length > 0; length -= 1) {
    node = matrix.get(node)![length].node
    path.push(node)
  }
  return path.reverse()
}

export default function findShortestPathLengthN<T>(
  graph: GraphFunction<T>,
  pathLength: number,
  startNode: T,
  endNode: T
) {
  return reconstructShortestPath(
    computeShortestPath(graph, pathLength, startNode, endNode),
    pathLength,
    endNode
  )
}
