// Simple implementation of Dijkstra's algorithm for pathfinding
import { BUILDING_CONNECTIONS } from "./constants"

interface Node {
  id: string
  distance: number
  visited: boolean
  previous: string | null
}

export function findShortestPath(startId: string, endId: string): string[] | null {
  // Create graph from connections
  const graph: Record<string, { to: string; distance: number }[]> = {}

  BUILDING_CONNECTIONS.forEach((conn) => {
    if (!graph[conn.from]) graph[conn.from] = []
    if (!graph[conn.to]) graph[conn.to] = []

    graph[conn.from].push({ to: conn.to, distance: conn.distance })
    graph[conn.to].push({ to: conn.from, distance: conn.distance }) // Bidirectional
  })

  // Initialize nodes
  const nodes: Record<string, Node> = {}
  Object.keys(graph).forEach((id) => {
    nodes[id] = {
      id,
      distance: id === startId ? 0 : Number.POSITIVE_INFINITY,
      visited: false,
      previous: null,
    }
  })

  // Find unvisited node with smallest distance
  const findMinDistanceNode = (): Node | null => {
    let minDistance = Number.POSITIVE_INFINITY
    let minNode: Node | null = null

    Object.values(nodes).forEach((node) => {
      if (!node.visited && node.distance < minDistance) {
        minDistance = node.distance
        minNode = node
      }
    })

    return minNode
  }

  // Main algorithm
  let current: Node | null
  while ((current = findMinDistanceNode())) {
    if (current.id === endId) break // Found destination

    current.visited = true

    // Update neighbors
    const neighbors = graph[current.id] || []
    neighbors.forEach((neighbor) => {
      const node = nodes[neighbor.to]
      if (!node.visited) {
        const newDistance = current!.distance + neighbor.distance
        if (newDistance < node.distance) {
          node.distance = newDistance
          node.previous = current!.id
        }
      }
    })
  }

  // No path found
  if (nodes[endId].distance === Number.POSITIVE_INFINITY) return null

  // Reconstruct path
  const path: string[] = []
  let currentId: string | null = endId

  while (currentId) {
    path.unshift(currentId)
    currentId = nodes[currentId].previous
  }

  return path
}
