<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const isNavigatorShowed = ref(false)

const toggleNavigation = () => {
  isNavigatorShowed.value = !isNavigatorShowed.value
}
</script>

<template>
  <div id="headerMobileToggleButton">
    <button
      class="icon-btn"
      @click="toggleNavigation()"
    >
      <div
        v-show="!isNavigatorShowed"
        i-carbon-menu
      />
      <div
        v-show="isNavigatorShowed"
        i-carbon-close
      />
    </button>
  </div>
  <div
    v-show="isNavigatorShowed"
    id="headerMobileNavigationContainer"
    :class="isDark ? 'dark' : ''"
  >
    <nav>
      <RouterLink
        to="/blog"
        class="icon-btn"
      >
        Blog
      </RouterLink>
      <a
        href="https://github.com/helltraitor"
        class="icon-btn"
      >
        Github
      </a>
      <a
        href="https://github.com/helltraitor/helltraitor.github.io"
        class="icon-btn"
      >
        Source
      </a>
      <a
        href="mailto: helltraitor@hotmail.com"
        class="icon-btn"
      >
        Mail
      </a>
      <button
        class="icon-btn"
        :title="t('button.toggle_dark')"
        @click="toggleDark()"
      >
        <div i="carbon-sun dark:carbon-moon" />
      </button>
      <button
        class="icon-btn"
        :title="t('button.toggle_langs')"
        @click="toggleLocales()"
      >
        <div i-carbon-language />
      </button>
    </nav>
  </div>
</template>

<style scoped lang="sass">
div#headerMobileToggleButton
  display: flex
  margin: auto

  button
    display: flex
    margin: auto

div#headerMobileNavigationContainer.dark
  background: #ffffff10

div#headerMobileNavigationContainer
  background: #12121210
  backdrop-filter: blur(10px)

  z-index: 2

  left: 0
  right: 0

  margin: 2rem
  padding: 1rem

  box-sizing: border-box
  border-radius: 5px

  position: fixed

  nav
    margin: auto

    font-size: 18px

    display: grid
    grid-auto-flow: row
    gap: 20px

    & > *
      margin-inline: auto
</style>
