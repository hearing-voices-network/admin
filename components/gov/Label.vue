<template>
  <label class="govuk-label">
    <slot />
    <template v-if="optional">
      (optional)
    </template>
  </label>
</template>

<script>
export default {
  props: {
    optional: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
