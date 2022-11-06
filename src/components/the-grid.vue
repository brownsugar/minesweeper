<template>
  <div
    class="grid brick"
    :class="[
      found === undefined ? '' : 'color-' + found,
      {
        danger: isMine && revealed && activeIndex === index,
        flat: revealed || (isMine && ended),
        disabled: flagged || revealed || ended,
        lighten: isMine && cheating && !revealed && !ended
      }
    ]"
  >
    <span>{{ content }}</span>
  </div>
</template>

<script lang="ts" setup>
import {
  mineStatus,
  flagStatus,
  revealStatus,
  foundStatus,
  coordToIndex
} from '~/composables/core'

const props = defineProps({
  row: {
    type: Number,
    required: true
  },
  col: {
    type: Number,
    required: true
  },
  activeIndex: {
    type: Number,
    default: -1
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
const isMine = computed(() => mineStatus.value[index.value])
const flagged = computed(() => flagStatus.value[index.value])
const revealed = computed(() => revealStatus.value[index.value])
const found = computed(() => foundStatus.value[index.value])

const content = computed(() => {
  if (isMine.value && !props.wins) {
    if (revealed.value || props.ended || props.cheating) {
      return '💣'
    }
  }
  if (flagged.value || (isMine.value && props.wins)) {
    return '🚩'
  }
  return revealed.value
    ? found.value
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
    &0 {
      color: transparent;
    }
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
