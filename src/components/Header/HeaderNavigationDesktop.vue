<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div>
    <nav id="headerDesktopNavigation">
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
div
  display: flex
  margin: auto

  nav#headerDesktopNavigation
    align-self: center
    margin-block: auto

    font-size: 18px

    display: grid
    grid-auto-flow: column
    gap: 20px

    & > *
      margin-inline: auto
</style>
