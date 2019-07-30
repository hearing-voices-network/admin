<template>
  <hr
    class="govuk-section-break"
    :class="{
      'govuk-section-break--visible': visible,
      'govuk-section-break--xl': visible,
      'govuk-section-break--l': visible,
      'govuk-section-break--m': visible
    }"
  />
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },

    xl: {
      type: Boolean,
      required: false,
      default: false
    },

    l: {
      type: Boolean,
      required: false,
      default: false
    },

    m: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
