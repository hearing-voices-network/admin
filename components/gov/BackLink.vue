<template>
  <nuxt-link :to="url" class="govuk-back-link">{{ text }}</nuxt-link>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: 'Back'
    },

    url: {
      type: [String, Object],
      required: true
    }
  }
}
</script>
