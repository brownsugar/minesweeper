<template>
  <footer>
    <a
      href="https://github.com/brownsugar/minesweeper"
      target="_blank"
      rel="noopener noreferrer"
    >View source code on GitHub</a>
  </footer>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TheFooter'
})
</script>

<style lang="scss" scoped>
footer {
  margin-top: 50px;
}
a {
  color: #8E9775;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
