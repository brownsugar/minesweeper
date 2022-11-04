<template>
  <div class="minesweeper">
    <div class="header">
      <div class="counter">
        {{ minesForDisplay }}
      </div>
      <div class="emoji brick">
        🙂
      </div>
      <div class="timer">
        {{ secondsForDisplay }}
      </div>
    </div>
    <div class="grids">
      <div
        v-for="row in rows"
        :key="row"
        class="row"
      >
        <div
          v-for="col in cols"
          :key="col"
          class="grid brick"
        >
          X
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const rows = 9
const cols = 9
const mines = ref(10)
const seconds = ref(29)

const padZero = (num: number) => num.toString().padStart(3, '0')

const minesForDisplay = computed(() => {
  return padZero(mines.value)
})
const secondsForDisplay = computed(() => {
  return padZero(seconds.value)
})

// 🙂
// 😮
// 😎
// 😵
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
.grid {
  width: 30px;
  height: 30px;
}
.brick {
  $base: #F5EDDC;
  $base-alt: darken($base, 15%);
  $lighten: lighten($base, 5%);
  $darken: darken($base, 25%);

  --grid-background: linear-gradient(135deg, #{$base}, #{$base-alt});
  --grid-border-light: #{$lighten};
  --grid-border-dark: #{$darken};

  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--grid-background);
  border: 3px solid;
  border-top-color: var(--grid-border-light);
  border-right-color: var(--grid-border-dark);
  border-bottom-color: var(--grid-border-dark);
  border-left-color: var(--grid-border-light);
  cursor: pointer;

  &:active {
    --grid-border-light: #{$darken};
    --grid-border-dark: #{$lighten};
  }
}
</style>
