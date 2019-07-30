<template>
  <div>
    <gov-skip-link />
    <gov-header service-name="Connecting Voices" :navigation="navigation" />
    <nuxt />
  </div>
</template>

<script>
import GovHeader from '~/components/gov/Header.vue'
import GovSkipLink from '~/components/gov/SkipLink.vue'

export default {
  components: {
    GovHeader,
    GovSkipLink
  },

  data() {
    return {
      navigation: [
        {
          text: 'Navigation item 1',
          url: { name: 'index' }
        },
        {
          text: 'Navigation item 2',
          url: { name: 'index' }
        },
        {
          text: 'Navigation item 3',
          url: { name: 'index' }
        },
        {
          text: 'Navigation item 4',
          url: { name: 'index' }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
$govuk-fonts-path: '../node_modules/govuk-frontend/govuk/assets/fonts/';
@import 'govuk-frontend/govuk/all.scss';
</style>
