<template>
  <div class="govuk-form-group" :class="{ 'govuk-form-group--error': error }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
