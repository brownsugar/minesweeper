export const seconds = ref(0)
export const timer = ref<NodeJS.Timeout>(null)

export const timerTick = () => {
  timer.value = setTimeout(() => {
    seconds.value++
    if (seconds.value < 999) {
      timerTick()
    }
  }, 1000)
}

export const timerStop = () => {
  clearTimeout(timer.value)
}
