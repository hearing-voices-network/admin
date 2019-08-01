<template>
  <div class="govuk-tabs" data-module="govuk-tabs">
    <h2 class="govuk-tabs__title">
      {{ title }}
    </h2>

    <ul class="govuk-tabs__list">
      <nuxt-link
        v-for="(tab, index) in tabs"
        :key="`gov::Tabs::tab::${index}`"
        tag="li"
        class="govuk-tabs__list-item"
        active-class="govuk-tabs__list-item--selected"
        :to="tab.url"
      >
        <a class="govuk-tabs__tab" href="#">
          {{ tab.text }}
        </a>
      </nuxt-link>
    </ul>

    <section class="govuk-tabs__panel">
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: 'Contents'
    },

    tabs: {
      type: Array,
      required: true
    }
  }
}
</script>
