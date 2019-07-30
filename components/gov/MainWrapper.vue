<template>
  <main
    id="main-content"
    class="govuk-main-wrapper"
    :class="{
      'govuk-main-wrapper--auto-spacing': autoSpacing,
      'govuk-main-wrapper--l': l
    }"
    role="main"
  >
    <slot />
  </main>
</template>

<script>
export default {
  props: {
    autoSpacing: {
      type: Boolean,
      required: false,
      default: false
    },

    l: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
