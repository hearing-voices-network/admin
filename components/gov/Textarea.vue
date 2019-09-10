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
      type: String,
      required: true
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
