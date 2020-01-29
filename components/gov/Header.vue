<template>
  <header class="govuk-header " role="banner" data-module="govuk-header">
    <div class="govuk-header__container govuk-width-container">
      <div class="govuk-header__logo">
        <nuxt-link
          :to="serviceUrl"
          class="govuk-header__link govuk-header__link--homepage"
        >
          <span class="govuk-header__logotype">
            <span class="govuk-header__logotype-text">
              {{ serviceName }}
            </span>
          </span>
        </nuxt-link>
      </div>
      <div class="govuk-header__content">
        <button
          type="button"
          role="button"
          class="govuk-header__menu-button govuk-js-header-toggle"
          aria-controls="navigation"
          aria-label="Show or hide Top Level Navigation"
          @click="onToggleMenu"
        >
          Menu
        </button>
        <nav v-if="hasNavigation">
          <ul
            id="navigation"
            class="govuk-header__navigation"
            :class="{ 'govuk-header__navigation--open': menuExpanded }"
            aria-label="Top Level Navigation"
          >
            <nuxt-link
              v-for="(item, index) in navigation"
              :key="`gov::Header::navigation::item::${index}`"
              tag="li"
              class="govuk-header__navigation-item"
              :exact="item.exact || false"
              active-class="govuk-header__navigation-item--active"
              :to="item.url"
            >
              <a href="#" class="govuk-header__link">
                {{ item.text }}
              </a>
            </nuxt-link>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    homepageUrl: {
      type: [Object, String],
      required: false,
      default: () => ({ name: 'index' })
    },

    serviceUrl: {
      type: [Object, String],
      required: false,
      default: () => ({ name: 'index' })
    },

    serviceName: {
      type: String,
      required: false,
      default: 'Service name'
    },

    navigation: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data() {
    return {
      menuExpanded: false
    }
  },

  computed: {
    hasNavigation() {
      return this.navigation.length > 0
    }
  },

  methods: {
    onToggleMenu() {
      this.menuExpanded = !this.menuExpanded
    }
  }
}
</script>
