<template>
  <td
    class="govuk-table__cell"
    :class="{
      'govuk-table__cell--numeric': numeric
    }"
  >
    <slot />
  </td>
</template>

<script>
export default {
  props: {
    numeric: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
