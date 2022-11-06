<template>
  <div class="wrap">
    <TheMinesweeper />
    <TheFooter />
  </div>
</template>

<script lang="ts" setup>
const icon = '/icon.png'
const title = 'Minesweeper with Vue 3 & TypeScript'
const description = 'Make the classic game with Vue 3 & TypeScript.'
const url = 'https://minesweeper-with-vue.vercel.app'
const appBarColor = '#8E9775'

useHead({
  title,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: icon },
    { rel: 'apple-touch-icon', href: icon },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap'
    }
  ],
  meta: [
    { name: 'theme-color', content: appBarColor },
    { name: 'apple-mobile-web-app-status-bar-style', content: appBarColor },
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:locale',
      content: 'en'
    },
    {
      property: 'og:url',
      content: url
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:image',
      content: url + '/thumb.png'
    }
  ]
})
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
