<template>
  <button
    class="grid brick"
    :disabled="flagged"
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
  }
})

const index = computed(() => coordToIndex(props.row, props.col))
const isMine = computed(() => mineStatus.value[index.value])
const flagged = computed(() => flagStatus.value[index.value])
const revealed = computed(() => revealStatus.value[index.value])

const content = computed(() => {
  if (isMine.value) {
    if (revealed.value) {
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
}
</style>
