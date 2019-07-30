<template>
  <th
    class="govuk-table__header"
    :class="{
      'govuk-table__header--numeric': numeric
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
    }
  }
}
</script>
