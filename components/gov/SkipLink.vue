<template>
  <a :href="href" class="govuk-skip-link">
    {{ text }}
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: false,
      default: '#main-content'
    },

    text: {
      type: String,
      required: false,
      default: 'Skip to main content'
    }
  }
}
</script>
