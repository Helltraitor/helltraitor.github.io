<script setup lang="ts">
import type { Ref } from 'vue'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const isDesktopHeader = ref(true)
const requiredDesktopWidth = ref(0)

/* REF ELEMENTS */
const headerElement: Ref<HTMLElement | null> = ref(null)
const headerBlockElement: Ref<HTMLElement | null> = ref(null)

const headerContainerElement: Ref<HTMLElement | null> = ref(null)
const headerLabelElement: Ref<HTMLElement | null> = ref(null)
const headerDesktopElement: Ref<HTMLElement | null> = ref(null)
/* REF END */

const resizeHeaderHandler = () => {
  /* Resize check */
  if (!headerContainerElement.value)
    throw new Error('Vue: Header container is not represented')

  isDesktopHeader.value = requiredDesktopWidth.value < headerContainerElement.value.scrollWidth

  /* Updating height of the under block element */
  if (!headerBlockElement.value || !headerElement.value)
    throw new Error('Vue: Header block or its element are not represented')

  if (headerBlockElement.value.clientHeight !== headerElement.value.clientHeight)
    headerBlockElement.value.style.minHeight = `${headerElement.value.clientHeight}px`
}

onMounted(() => {
  if (!headerContainerElement.value || !headerLabelElement.value || !headerDesktopElement.value)
    throw new Error('Vue: Header container, label or desktop are not represented')

  requiredDesktopWidth.value = (
    // 20% from spacer min-width
    headerContainerElement.value.scrollWidth * 0.2
    + headerLabelElement.value.scrollWidth
    + headerDesktopElement.value.scrollWidth
  )

  // Initial check for mobile
  resizeHeaderHandler()

  // REGISTRATION
  window.addEventListener('resize', resizeHeaderHandler)
})
</script>

<template>
  <header
    ref="headerElement"
    :class="isDesktopHeader ? 'desktop' : 'mobile'"
  >
    <div
      id="headerContainer"
      ref="headerContainerElement"
    >
      <div
        id="headerLabel"
        ref="headerLabelElement"
      >
        <HeaderLabel />
      </div>
      <div id="headerSpacer" />
      <div id="headerNavigation">
        <div
          v-show="isDesktopHeader"
          ref="headerDesktopElement"
        >
          <HeaderNavigationDesktop />
        </div>
        <div
          v-show="!isDesktopHeader"
          ref="headerMobileElement"
        >
          <HeaderNavigationMobile />
        </div>
      </div>
    </div>
  </header>
  <div
    id="headerBlock"
    ref="headerBlockElement"
  />
</template>

<style scoped lang="sass">
header
  display: block
  z-index: 1

  position: fixed
  width: 100%
  top: 0

  backdrop-filter: blur(10px)

  div#headerContainer
    display: flex

    margin-block: auto
    margin-inline: 5%

    div#headerLabel
      margin-inline: 0
      margin-block: auto

    div#headerSpacer
      margin-inline: auto
      min-width: 20%

    div#headerNavigation
      margin-inline: 0
      margin-block: auto

header.desktop
  padding: 1.5rem

header.mobile
  padding: 1rem

div#headerBlock
  width: 100%

  margin: 0
  padding: 0
</style>
