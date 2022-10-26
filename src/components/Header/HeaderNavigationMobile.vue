<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <button
    id="headerNavigationMobileMenuButton"
    class="icon-btn"
  >
    <div i-carbon-menu />
  </button>
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
