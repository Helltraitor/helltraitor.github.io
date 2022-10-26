<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

class HeaderResizeController {
  readonly container: {
    element: HTMLElement
    label: {
      element: HTMLElement
      scrollWidth: number
    }
    mobile: {
      element: HTMLElement
      scrollWidth: number
    }
    desktop: {
      element: HTMLElement
      scrollWidth: number
    }
  }

  constructor(container_id: string, label_id: string, mobile_id: string, desktop_id: string) {
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

    this.container = {
      element: container,
      label: {
        element: label,
        scrollWidth: label.scrollWidth,
      },
      mobile: {
        element: mobile,
        scrollWidth: mobile.scrollWidth,
      },
      desktop: {
        element: desktop,
        scrollWidth: desktop.scrollWidth,
      },
    }
  }

  public resize(): void {
    const requiredWidth = this.container.desktop.scrollWidth + this.container.label.scrollWidth
    const containerWidth = this.container.element.clientWidth
    const overflow = containerWidth < requiredWidth

    if (overflow) {
      this.container.desktop.element.style.display = 'none'
      this.container.mobile.element.style.display = 'block'
    }
    else {
      this.container.desktop.element.style.display = 'block'
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
  )

  headerResizeController.resize()

  window.addEventListener('resize', () => headerResizeController.resize())
})
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
        <div id="headerNavigationMobile">
          <HeaderNavigationMobile />
        </div>
        <div id="headerNavigationDesktop">
          <HeaderNavigationDesktop />
        </div>
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

        & > *
          margin-block: auto
</style>
