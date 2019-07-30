<template>
  <button
    :type="type"
    class="govuk-button"
    :class="{
      'govuk-button--start': start,
      'govuk-button--secondary': secondary,
      'govuk-button--warning': warning,
      'govuk-button--disabled': disabled
    }"
    :disabled="disabled"
    data-module="govuk-button"
    @click="onClick"
  >
    <slot />

    <svg
      v-if="start"
      class="govuk-button__start-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="19"
      viewBox="0 0 33 40"
      role="presentation"
      focusable="false"
    >
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'submit'
    },

    start: {
      type: Boolean,
      required: false,
      default: false
    },

    secondary: {
      type: Boolean,
      required: false,
      default: false
    },

    warning: {
      type: Boolean,
      required: false,
      default: false
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
