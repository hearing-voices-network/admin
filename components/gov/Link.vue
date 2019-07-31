<template>
  <a
    v-if="isHref"
    class="govuk-link"
    :class="{ 'govuk-link--no-visited-state': noVisitedState }"
    :href="url"
    @click="onClick"
  >
    <slot />
  </a>

  <nuxt-link
    v-else
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
      required: false,
      default: 'javascript:;'
    },

    noVisitedState: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    isHref() {
      return typeof this.url === 'string'
    }
  },

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
