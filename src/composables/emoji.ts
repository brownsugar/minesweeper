enum emojis {
  default = '🙂',
  active = '😮',
  win = '😎',
  lose = '😵'
}

type emojiStatusT = keyof typeof emojis

const emojiStatus = ref<emojiStatusT>('default')

export const emoji = computed(() => {
  return emojis[emojiStatus.value]
})
export const setEmoji = (type: emojiStatusT) => {
  emojiStatus.value = type
}
