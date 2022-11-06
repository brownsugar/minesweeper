<template>
  <div
    class="grid brick"
    :class="[
      'color-' + grid.adjacent,
      {
        danger: grid.isMine && grid.revealed && highlightsIndex.includes(index),
        flat: grid.revealed || (grid.isMine && ended),
        disabled: grid.flagged || grid.revealed || ended,
        lighten: grid.isMine && cheating && !grid.revealed && !ended
      }
    ]"
  >
    <span>{{ content }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  row: {
    type: Number,
    required: true
  },
  col: {
    type: Number,
    required: true
  },
  highlightsIndex: {
    type: Array,
    default: () => []
  },
  ended: {
    type: Boolean,
    default: false
  },
  wins: {
    type: Boolean,
    default: false
  },
  cheating: {
    type: Boolean,
    default: false
  }
})

const index = computed(() => coordToIndex(props.row, props.col))
const grid = computed(() => gridData.value[index.value])

const content = computed(() => {
  if (grid.value.isMine && !props.wins) {
    if (grid.value.revealed || props.ended || props.cheating) {
      return '💣'
    }
  }
  if (grid.value.flagged || (grid.value.isMine && props.wins)) {
    return '🚩'
  }
  return grid.value.revealed
    ? grid.value.adjacent || ''
    : ''
})
</script>
<script lang="ts">
export default defineComponent({
  name: 'TheGrid'
})
</script>

<style lang="scss" scoped>
.grid {
  width: 30px;
  height: 30px;
  font-weight: 900;

  &.color- {
    &1 {
      color: #185ADB;
    }
    &2 {
      color: #3E8E7E;
    }
    &3 {
      color: #CF0A0A;
    }
    &4,
    &5,
    &6,
    &7,
    &8 {
      color: #590995;
    }
  }
  &.lighten {

    span {
      opacity: .5;
    }
  }
  &.flat {
    background: var(--grid-background-flat);
    border-width: 1px;
  }
  &.danger {
    background: #E26868;
    border: none;
  }
  span {
    pointer-events: none;
  }
}
</style>
