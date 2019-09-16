<template>
  <legend class="govuk-fieldset__legend" :class="classes">
    <slot />
  </legend>
</template>

<script>
export default {
  props: {
    size: {
      required: false,
      default: null,
      validator: (size) => {
        return ['string'].includes(typeof size) || size === null
      }
    }
  },

  computed: {
    classes() {
      return this.size ? [`govuk-fieldset__legend--${this.size}`] : null
    }
  }
}
</script>
