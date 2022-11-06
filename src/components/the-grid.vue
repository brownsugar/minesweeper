<template>
  <button
    class="grid brick"
    :class="{
      danger: isMine && activeIndex === index,
      flat: revealed || (isMine && ended)
    }"
    :disabled="flagged || revealed || ended"
  >
    {{ content }}
  </button>
</template>

<script lang="ts" setup>
import {
  mineStatus,
  flagStatus,
  revealStatus,
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
  cheating: {
    type: Boolean,
    default: false
  }
})

const index = computed(() => coordToIndex(props.row, props.col))
const isMine = computed(() => mineStatus.value[index.value])
const flagged = computed(() => flagStatus.value[index.value])
const revealed = computed(() => revealStatus.value[index.value])

const content = computed(() => {
  if (isMine.value) {
    if (revealed.value || props.ended || props.cheating) {
      return '💣'
    }
  }
  if (flagged.value) {
    return '🚩'
  }
  return ''
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

  &.danger {
    background: #E26868;
    border: none;
  }
  &.flat {
    border: none;
  }
}
</style>
