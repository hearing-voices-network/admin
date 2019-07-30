<template>
  <div>
    <gov-skip-link />
    <gov-header
      service-name="Connecting Voices"
      :navigation="header.navigation"
    />

    <nuxt />

    <gov-footer :navigation="footer.navigation" :meta="footer.meta" />
  </div>
</template>

<script>
import GovFooter from '~/components/gov/Footer.vue'
import GovHeader from '~/components/gov/Header.vue'
import GovSkipLink from '~/components/gov/SkipLink.vue'

export default {
  components: {
    GovFooter,
    GovHeader,
    GovSkipLink
  },

  data() {
    return {
      header: {
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
      },

      footer: {
        navigation: [
          {
            title: 'Main links',
            items: [
              {
                text: 'Main link 1',
                url: { name: 'index' }
              },
              {
                text: 'Main link 2',
                url: { name: 'index' }
              },
              {
                text: 'Main link 3',
                url: { name: 'index' }
              }
            ]
          }
        ],
        meta: {
          visuallyHiddenTitle: 'Support links',
          items: [
            {
              text: 'Meta link 1',
              url: { name: 'index' }
            },
            {
              text: 'Meta link 2',
              url: { name: 'index' }
            },
            {
              text: 'Meta link 3',
              url: { name: 'index' }
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss">
$govuk-fonts-path: '../node_modules/govuk-frontend/govuk/assets/fonts/';
@import 'govuk-frontend/govuk/all.scss';
</style>
