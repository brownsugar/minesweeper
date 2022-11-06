<template>
  <div class="minesweeper">
    <div class="header">
      <div class="counter">
        {{ minesForDisplay }}
      </div>
      <div
        class="emoji brick"
        @click="reset"
      >
        {{ emoji }}
      </div>
      <div class="timer">
        {{ secondsForDisplay }}
      </div>
    </div>
    <div
      class="grids"
      @click="clickHandler"
      @mousedown="mouseEventHandler($event, true)"
      @mouseup="mouseEventHandler($event, false)"
      @contextmenu.prevent="contextmenuHandler"
    >
      <div
        v-for="row in rows"
        :key="row"
        class="row"
      >
        <TheGrid
          v-for="col in cols"
          :key="col"
          :data-index="coordToIndex(row, col)"
          :row="row"
          :col="col"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  rows,
  cols,
  mines
} from '~/composables/core'
import {
  seconds
} from '~/composables/timer'
import { emoji } from '~/composables/emoji'

const started = ref(false)

const padZero = (num: number) => {
  if (num >= 0) {
    return num.toString().padStart(3, '0')
  }
  return num.toString()
}
const minesForDisplay = computed(() => {
  const flagged = flagStatus.value.filter(value => value)
  return padZero(mines.value - flagged.length)
})
const secondsForDisplay = computed(() => {
  return padZero(seconds.value)
})

// Status
const start = (initialIndex: number) => {
  if (started.value) {
    return
  }
  started.value = true
  initGame(initialIndex)
  timerTick()
}
const reset = () => {
  started.value = false
  seconds.value = 0
  timerStop()
  resetFlagStatus()
  resetRevealStatus()
}

// Handlers
const isGrid = (target: HTMLDivElement) => target.classList.contains('grid')
const clickHandler = (e: MouseEvent) => {
  const target = e.target as HTMLDivElement
  if (!isGrid(target)) {
    return
  }
  const index = Number(target.dataset.index)
  start(index)
  revealGrid(index)
}
const mouseEventHandler = (e: MouseEvent, down: boolean) => {
  const target = e.target as HTMLDivElement
  if (!isGrid(target)) {
    return
  }
  if (down) {
    setEmoji('active')
  } else {
    setEmoji('default')
  }
}
const contextmenuHandler = (e: MouseEvent) => {
  const target = e.target as HTMLDivElement
  if (!isGrid(target)) {
    return
  }
  const index = Number(target.dataset.index)
  flagGrid(index)
}

onBeforeUnmount(() => {
  timerStop()
})
</script>

<style lang="scss" scoped>
$border-radius: 5px;

.minesweeper {
  padding: 15px;
  background: #8E9775;
  border-radius: calc($border-radius * 2);
  box-shadow: 0 5px 15px rgba(#000, .3);
}
.header, .grids {
  background: #F4EEE8;
  padding: 10px;
  border-radius: calc($border-radius * 2);
}
.header {
  display: flex;
  justify-content: space-between;
}
.counter,
.timer {
  background: #4A503D;
  color: #FFF;
  font-weight: bold;
  font-size: 26px;
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  border-radius: $border-radius;
}
.emoji {
  width: 36px;
  height: 36px;
  font-size: 28px;
  border-radius: $border-radius;
}
.grids {
  margin-top: 10px;
}
.row {
  display: flex;

  &:first-child {
    .grid:first-child {
      border-top-left-radius: $border-radius;
    }
    .grid:last-child {
      border-top-right-radius: $border-radius;
    }
  }
  &:last-child {
    .grid:first-child {
      border-bottom-left-radius: $border-radius;
    }
    .grid:last-child {
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>