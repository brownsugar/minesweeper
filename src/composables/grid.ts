import {
  mineStatus,
  flagStatus,
  revealStatus,
  foundStatus
} from './core'

export const flagGrid = (index: number, value: boolean = undefined) => {
  if (revealStatus.value[index]) {
    return
  }
  if (value === undefined) {
    flagStatus.value[index] = !flagStatus.value[index]
    return
  }
  flagStatus.value[index] = value
}

export const revealGrid = (index: number) => {
  if (flagStatus.value[index] || revealStatus.value[index]) {
    return null
  }
  revealStatus.value[index] = true

  const isMine = mineStatus.value[index]
  return {
    isMine,
    isWin: isComplete() && !isMine
  }
}

export const seekSurrondingGrids = (index: number) => {
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
      const isMine = mineStatus.value[index]
      if (isMine) {
        found++
      }
    }
  }
  foundStatus.value[index] = found
}
