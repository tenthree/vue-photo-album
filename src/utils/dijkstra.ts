import Heap, { rankingFunctionComparator } from '@/utils/heap'

export type GraphFunction<T> = (node: T) => Map<T, number>

export type GraphNodeValue<T> = {
  id: T
  weight: number
}

function buildPrecedentsMap<T>(
  graph: GraphFunction<T>,
  startNode: T,
  endNode: T
) {
  const precedentsMap = new Map<T, T>()
  const visited = new Set<T>()

  const storedShortestPaths = new Map<T, number>()
  storedShortestPaths.set(startNode, 0)

  const queue = new Heap<GraphNodeValue<T>>(
    rankingFunctionComparator((el) => el.weight)
  )
  queue.push({ id: startNode, weight: 0 })

  while (queue.size > 0) {
    const { id, weight } = queue.pop()!

    if (visited.has(id)) {
      continue
    }

    const neighboringNodes = graph(id)
    visited.add(id)

    neighboringNodes.forEach((neighborWeight, neighbor) => {
      const accWeight = weight + neighborWeight
      const currentId = precedentsMap.get(neighbor)
      const currentWeight = storedShortestPaths.get(neighbor)
      if (
        currentWeight === undefined ||
        (currentWeight > accWeight &&
          (currentWeight / accWeight > 1.005 ||
            (currentId !== undefined && currentId! < id)))
      ) {
        storedShortestPaths.set(neighbor, accWeight)
        queue.push({ id: neighbor, weight: accWeight })
        precedentsMap.set(neighbor, id)
      }
    })
  }

  return storedShortestPaths.has(endNode) ? precedentsMap : undefined
}

function getPathFromPrecedentsMap<T>(precedentsMap: Map<T, T>, endNode: T) {
  const nodes = []
  for (
    let node: T | undefined = endNode;
    node !== undefined;
    node = precedentsMap.get(node)
  ) {
    nodes.push(node)
  }
  return nodes.reverse()
}

export default function finrShortestPath<T>(
  graph: GraphFunction<T>,
  startNode: T,
  endNode: T
) {
  const precedentsMap = buildPrecedentsMap(graph, startNode, endNode)
  return precedentsMap !== undefined
    ? getPathFromPrecedentsMap(precedentsMap, endNode)
    : undefined
}
