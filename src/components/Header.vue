<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <header>
    <div id="headerContainer">
      <div id="headerLabel">
        <RouterLink
          id="headerLabelValue"
          to="/"
          class="icon-btn"
        >
          <p>Helltraitor</p>
        </RouterLink>
      </div>
      <div id="headerSpacer" />
      <div id="headerNavigationBar">
        <nav id="headerNavigation">
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
            class="icon-btn mx-2"
            :title="t('button.toggle_dark')"
            @click="toggleDark()"
          >
            <div i="carbon-sun dark:carbon-moon" />
          </button>
          <button
            class="icon-btn mx-2"
            :title="t('button.toggle_langs')"
            @click="toggleLocales()"
          >
            <div i-carbon-language />
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">
  header
    display: block
    padding: 1.5rem

    position: sticky
    top: 0

    div#headerContainer
      display: flex
      margin-inline: 5% 5%

      div#headerLabel
        display: flex

        p
          margin: 0

          font-family: 'Courier New', Courier, monospace
          font-size: 22px

      div#headerSpacer
        margin-inline: auto
        min-width: 10%

      div#headerNavigationBar
        display: flex

        nav#headerNavigation
          align-self: center
          margin-block: auto

          font-size: 18px

          display: grid
          grid-auto-flow: column
          gap: 20px

          & > *
            margin-inline: auto
</style>
