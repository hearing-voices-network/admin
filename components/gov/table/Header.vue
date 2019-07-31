<template>
  <th
    class="govuk-table__header"
    :class="{
      'govuk-table__header--numeric': numeric,
      'custom-table__header--clickable': clickable
    }"
  >
    <slot />
  </th>
</template>

<script>
export default {
  props: {
    numeric: {
      type: Boolean,
      required: false,
      default: false
    },

    clickable: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
