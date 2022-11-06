// Config
export const rows = ref(9)
export const cols = ref(9)
export const mines = ref(10)

// Data
export const mineStatus = ref<boolean[]>([])
export const flagStatus = ref<boolean[]>([])
export const revealStatus = ref<boolean[]>([])

const gridTotal = computed(() => rows.value * cols.value)

export const initGame = (initialIndex: number) => {
  let data = getInitArray()
    .fill(true, 0, mines.value)

  data = shuffleArray(data)
  while (data[initialIndex]) {
    data = shuffleArray(data)
  }

  mineStatus.value = data
  resetFlagStatus()
  resetRevealStatus()
}

export const resetFlagStatus = () => {
  flagStatus.value = getInitArray()
}

export const resetRevealStatus = () => {
  revealStatus.value = getInitArray()
}

export const coordToIndex = (row: number, col: number) => {
  return (row - 1) * cols.value + col - 1
}

const getInitArray = () => {
  return Array<boolean>(gridTotal.value).fill(false)
}

const shuffleArray = (array: boolean[]) => {
  const clonedArray = [...array]
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]]
  }
  return clonedArray
}
