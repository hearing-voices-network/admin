<template>
  <input
    class="govuk-input"
    :class="{ 'govuk-input--error': error }"
    :type="type"
    :value="value"
    @input="onInput($event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      validator: (value) => {
        return ['string', 'number'].includes(typeof value) || value === null
      }
    },

    error: {
      type: Boolean,
      required: false,
      default: false
    },

    type: {
      type: String,
      required: false,
      default: 'text'
    }
  },

  methods: {
    onInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
