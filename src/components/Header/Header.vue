<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

class HeaderResizeController {
  readonly header: HTMLElement

  readonly container: {
    element: HTMLElement
    label: {
      element: HTMLElement
      scrollWidth: number
    }
    mobile: {
      element: HTMLElement
      scrollWidth: number
      display: string
    }
    desktop: {
      element: HTMLElement
      scrollWidth: number
      display: string
    }
  }

  readonly spacer: HTMLElement

  constructor(
    container_id: string,
    label_id: string,
    mobile_id: string,
    desktop_id: string,
    spacer_id: string,
  ) {
    const header = document.querySelector('header')
    if (!(header instanceof HTMLElement))
      throw new Error('Wrong container id')

    const container = document.querySelector(container_id)
    if (!(container instanceof HTMLElement))
      throw new Error('Wrong container id')

    const label = document.querySelector(label_id)
    if (!(label instanceof HTMLElement))
      throw new Error('Wrong label id')

    const mobile = document.querySelector(mobile_id)
    if (!(mobile instanceof HTMLElement))
      throw new Error('Wrong mobile id')

    const desktop = document.querySelector(desktop_id)
    if (!(desktop instanceof HTMLElement))
      throw new Error('Wrong desktop id')

    const spacer = document.querySelector(spacer_id)
    if (!(spacer instanceof HTMLElement))
      throw new Error('Wrong spacer id')

    this.header = header
    this.container = {
      element: header,
      label: {
        element: label,
        scrollWidth: label.scrollWidth,
      },
      mobile: {
        element: mobile,
        scrollWidth: mobile.scrollWidth,
        display: mobile.style.display,
      },
      desktop: {
        element: desktop,
        scrollWidth: desktop.scrollWidth,
        display: desktop.style.display,
      },
    }
    this.spacer = spacer
  }

  public resize(): void {
    const requiredWidth = this.container.desktop.scrollWidth + this.container.label.scrollWidth + 100
    const containerWidth = this.container.element.clientWidth
    const overflow = containerWidth < requiredWidth

    if (overflow) {
      this.header.classList.remove('desktop-header')
      this.header.classList.add('mobile-header')

      this.spacer.style.height = '0'

      this.container.desktop.element.style.display = 'none'
      this.container.mobile.element.style.display = this.container.mobile.display
    }
    else {
      this.header.classList.remove('mobile-header')
      this.header.classList.add('desktop-header')

      this.spacer.style.height = `${this.header.scrollHeight}px`

      this.container.desktop.element.style.display = this.container.desktop.display
      this.container.mobile.element.style.display = 'none'
    }
  }
}

onMounted(() => {
  const headerResizeController = new HeaderResizeController(
    '#headerContainer',
    '#headerLabel',
    '#headerNavigationMobile',
    '#headerNavigationDesktop',
    '#headerDesktopSpacer',
  )

  headerResizeController.resize()

  window.addEventListener('resize', () => headerResizeController.resize())
})
</script>

<template>
  <header class="desktop-header">
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
        <div id="headerNavigationMobile">
          <HeaderNavigationMobile />
        </div>
        <div id="headerNavigationDesktop">
          <HeaderNavigationDesktop />
        </div>
      </div>
    </div>
  </header>
  <div id="headerDesktopSpacer" />
</template>

<style scoped lang="sass">
  header
    display: block
    top: 0

    backdrop-filter: blur(10px)

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

        & > *
          margin-block: auto
          display: grid

  header.desktop-header
    position: fixed

    padding: 1.5rem
    width: 100%

  div#headerDesktopSpacer
    margin: 0
    padding: 0

  header.mobile-header
    position: sticky
    padding: 1rem
</style>
