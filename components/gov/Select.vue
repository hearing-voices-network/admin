<template>
  <select
    class="govuk-select"
    :class="{ 'govuk-select--error': error }"
    @change="onChange($event.target.value)"
  >
    <option
      v-for="(option, key) in options"
      :key="`component::gov::Select::${key}`"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.text }}
    </option>
  </select>
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

    options: {
      type: Array,
      required: true
    },

    error: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
