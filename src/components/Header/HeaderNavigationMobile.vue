<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const toggleNavigation = () => {
  const header = document.querySelector('header')
  if (!(header instanceof HTMLElement))
    throw new Error('Wrong container id')

  const button = document.querySelector('#headerNavigationMobileMenuButton')
  if (!(button instanceof HTMLElement))
    throw new Error('Button has wrong type')

  const menuIcon = document.querySelector('#headerNavigationMobileMenuButtonMenu')
  if (!(menuIcon instanceof HTMLElement))
    throw new Error('Menu icon has wrong type')

  const closeIcon = document.querySelector('#headerNavigationMobileMenuButtonClose')
  if (!(closeIcon instanceof HTMLElement))
    throw new Error('Close icon has wrong type')

  const navigation = document.querySelector('#headerMobileNavigation')
  if (!(navigation instanceof HTMLElement))
    throw new Error('Close icon has wrong type')

  if (navigation.style.display === 'grid') {
    navigation.style.display = 'none'
    closeIcon.style.display = 'none'
    menuIcon.style.display = 'block'
  }
  else {
    navigation.style.display = 'grid'
    navigation.style.top = `${header.clientHeight}px`
    closeIcon.style.display = 'block'
    menuIcon.style.display = 'none'
  }
}
</script>

<template>
  <div>
    <button
      id="headerNavigationMobileMenuButton"
      class="icon-btn"
      @click="toggleNavigation()"
    >
      <div
        id="headerNavigationMobileMenuButtonMenu"
        i-carbon-menu
      />
      <div
        v-show="false"
        id="headerNavigationMobileMenuButtonClose"
        i-carbon-close
      />
    </button>
  </div>
  <nav
    v-show="false"
    id="headerMobileNavigation"
  >
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
</template>

<style scoped lang="sass">
div
  display: flex
  margin: auto

nav#headerMobileNavigation
  margin-inline: auto
  left: 0
  right: 0
  margin: auto
  position: fixed
  z-index: 0

  backdrop-filter: blur(10px)
  -webkit-backdrop-filter: blur(10px)

  font-size: 18px

  display: grid
  grid-auto-flow: row
  gap: 20px

  & > *
    margin-inline: auto
</style>
