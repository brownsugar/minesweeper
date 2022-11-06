export const flagGrid = (index: number, value: boolean = undefined) => {
  if (gridData.value[index].revealed) {
    return
  }
  if (value === undefined) {
    gridData.value[index].flagged = !gridData.value[index].flagged
    return
  }
  gridData.value[index].flagged = value
}

export const revealGrid = (index: number) => {
  if (gridData.value[index].flagged || gridData.value[index].revealed) {
    return
  }
  gridData.value[index].revealed = true
}
