<template>
  <footer class="govuk-footer " role="contentinfo">
    <div class="govuk-width-container ">
      <div v-if="hasNavigation" class="govuk-footer__navigation">
        <div
          v-for="(item, index) in navigation"
          :key="`gov::Footer::navigation::item::${index}`"
          class="govuk-footer__section"
        >
          <h2 class="govuk-footer__heading govuk-heading-m">
            {{ item.title }}
          </h2>
          <ul class="govuk-footer__list govuk-footer__list--columns-2">
            <li
              v-for="(subItem, subIndex) in item.items"
              :key="
                `gov::Footer::navigation::item::${index}::subItem::${subIndex}`
              "
              class="govuk-footer__list-item"
            >
              <nuxt-link class="govuk-footer__link" :to="subItem.url">
                {{ subItem.text }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <hr v-if="hasNavigation" class="govuk-footer__section-break" />
      <div class="govuk-footer__meta">
        <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
          <h2 class="govuk-visually-hidden">{{ meta.visuallyHiddenTitle }}</h2>
          <ul class="govuk-footer__inline-list">
            <li
              v-for="(item, index) in meta.items"
              :key="`gov::Footer::meta::item::${index}`"
              class="govuk-footer__inline-list-item"
            >
              <nuxt-link class="govuk-footer__link" :to="item.url">
                {{ item.text }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Array,
      required: false,
      default: () => []
    },

    meta: {
      type: Object,
      required: false,
      default: () => ({
        visuallyHiddenTitle: 'Support links',
        items: []
      })
    }
  },

  computed: {
    hasNavigation() {
      return this.navigation.length > 0
    }
  }
}
</script>
