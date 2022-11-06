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

export const gridData = ref<gridDataT[]>([])

const gridTotal = computed(() => rows.value * cols.value)

export const initGame = () => {
  gridData.value = Array<gridDataT>(gridTotal.value)
    .fill(null)
    .map(() => ({ ...gridDataDefault }))
}

export const placeMines = (initialIndex: number) => {
  const minesIndex = getMinesIndex(initialIndex)
  gridData.value
    .map((grid, i) => {
      if (minesIndex.includes(i)) {
        grid.isMine = true
      }
      return grid
    })
    .forEach((grid, index, array) => {
      const found = seekSurrondingGrids(index, array)
      grid.adjacent = found
    })
}

const getMinesIndex = (initialIndex: number) => {
  const result: number[] = []
  while (result.length < mines.value) {
    const index = getRandomNumber(0, gridTotal.value - 1)
    if (index !== initialIndex && !result.includes(index)) {
      result.push(index)
    }
  }
  return result
}

const seekSurrondingGrids = (index: number, data: gridDataT[]) => {
  const { row, col } = indexToCoord(index)
  let found = 0
  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 1 || i > rows.value) {
      continue
    }
    for (let j = col - 1; j <= col + 1; j++) {
      if (
        j < 1 || j > cols.value ||
        (i === row && j === col)
      ) {
        continue
      }
      const index = coordToIndex(i, j)
      const isMine = data[index].isMine
      if (isMine) {
        found++
      }
    }
  }
  return found
}

export const isGameComplete = () => {
  const revealed = gridData.value.filter(grid => grid.revealed)
  return revealed.length === gridTotal.value - mines.value
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
