<template>
  <nuxt-link
    class="govuk-link"
    :class="{ 'govuk-link--no-visited-state': noVisitedState }"
    :to="url"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    url: {
      type: [String, Object],
      required: true
    },

    noVisitedState: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
