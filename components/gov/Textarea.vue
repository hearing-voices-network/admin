<template>
  <textarea
    class="govuk-textarea"
    :class="{ 'govuk-textarea--error': error }"
    :rows="rows"
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

    rows: {
      type: Number,
      required: false,
      default: 5
    }
  },

  methods: {
    onInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
