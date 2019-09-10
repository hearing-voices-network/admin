<template>
  <span id="passport-issued-error" class="govuk-error-message">
    <gov-visually-hidden>Error:</gov-visually-hidden> <slot />
  </span>
</template>

<script>
import GovVisuallyHidden from '~/components/gov/VisuallyHidden.vue'

export default {
  components: {
    GovVisuallyHidden
  }
}
</script>
