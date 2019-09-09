<template>
  <div class="govuk-breadcrumbs">
    <ol class="govuk-breadcrumbs__list">
      <li
        v-for="(item, index) in items"
        :key="`gov::Breadcrumbs::item::${index}`"
        class="govuk-breadcrumbs__list-item"
        :aria-current="isActive(item) ? 'page' : null"
      >
        <template v-if="isActive(item)">{{ item.text }}</template>
        <nuxt-link v-else :to="item.url" class="govuk-breadcrumbs__link">
          {{ item.text }}
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  methods: {
    isActive(item) {
      return item.url === undefined
    }
  }
}
</script>
