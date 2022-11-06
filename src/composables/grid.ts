import { mineStatus, flagStatus, revealStatus } from './core'

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
    return
  }
  revealStatus.value[index] = true
  return mineStatus.value[index]
}
