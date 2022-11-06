// Config
export const rows = ref(9)
export const cols = ref(9)
export const mines = ref(10)

// Data
const gridDataDefault = {
  isMine: false,
  flagged: false,
  revealed: false,
  adjacent: 0
}
type gridDataT = typeof gridDataDefault
const gridTotal = computed(() => rows.value * cols.value)

// Grids
export const gridData = ref<gridDataT[]>([])
export const flagGrid = (index: number, value: boolean = undefined) => {
  const grid = gridData.value[index]
  if (grid.revealed) {
    return
  }
  if (value === undefined) {
    grid.flagged = !grid.flagged
    return
  }
  grid.flagged = value
}
export const revealGrid = (index: number) => {
  const grid = gridData.value[index]
  if (grid.flagged || grid.revealed) {
    return
  }
  grid.revealed = true
  if (!grid.isMine && grid.adjacent === 0) {
    revealAdjacent(index)
  }
}

// Game
export const initGame = () => {
  gridData.value = Array<gridDataT>(gridTotal.value)
    .fill(null)
    .map(() => ({ ...gridDataDefault }))
}
export const placeMines = (initialIndex: number) => {
  const adjacentIndexes = getAdjacentIndexes(initialIndex)
  const minesIndex = getMinesIndex(adjacentIndexes)
  gridData.value
    .map((grid, i) => {
      if (minesIndex.includes(i)) {
        grid.isMine = true
      }
      return grid
    })
    .forEach((grid, index) => {
      const found = countAdjacent(index)
      grid.adjacent = found
    })
}
const getMinesIndex = (adjacentIndexes: number[]) => {
  const result: number[] = []
  while (result.length < mines.value) {
    const index = getRandomNumber(0, gridTotal.value - 1)
    if (!adjacentIndexes.includes(index) && !result.includes(index)) {
      result.push(index)
    }
  }
  return result
}
export const isGameComplete = () => {
  const revealed = gridData.value.filter(grid => grid.revealed)
  return revealed.length === gridTotal.value - mines.value
}

// Finders
const getAdjacentIndexes = (index: number) => {
  const indexes: number[] = []
  seekAdjacentGrids(index, (_, i) => {
    indexes.push(i)
  }, true)
  return indexes
}
const countAdjacent = (index: number) => {
  let found = 0
  seekAdjacentGrids(index, (grid) => {
    if (grid.isMine) {
      found++
    }
  })
  return found
}
const revealAdjacent = (index: number) => {
  seekAdjacentGrids(index, (grid, i) => {
    if (!grid.isMine && !grid.revealed) {
      grid.revealed = true
      if (grid.adjacent === 0) {
        revealAdjacent(i)
      }
    }
  })
}
const seekAdjacentGrids = (
  index: number,
  callback: (grid: gridDataT, index: number) => void,
  includeSelf = false
) => {
  const { row, col } = indexToCoord(index)
  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 1 || i > rows.value) {
      continue
    }
    for (let j = col - 1; j <= col + 1; j++) {
      if (
        j < 1 || j > cols.value ||
        (!includeSelf && i === row && j === col)
      ) {
        continue
      }
      const index = coordToIndex(i, j)
      callback(gridData.value[index], index)
    }
  }
}

export const coordToIndex = (row: number, col: number) => {
  return (row - 1) * cols.value + col - 1
}
export const indexToCoord = (index: number) => {
  return {
    row: Math.floor(index / cols.value) + 1,
    col: (index % cols.value) + 1
  }
}
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
