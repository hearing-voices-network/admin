<template>
  <div>
    <gov-skip-link />
    <gov-header
      :service-name="appName"
      :navigation="$store.state.oauth.accessToken ? header.navigation : []"
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
      appName: process.env.appName,
      header: {
        navigation: [
          {
            text: 'Dashboard',
            url: { name: 'index' },
            exact: true
          },
          {
            text: 'Contributions',
            url: { name: 'contributions' }
          },
          {
            text: 'End Users',
            url: { name: 'end-users' }
          },
          {
            text: 'Admin Users',
            url: { name: 'admin-users' }
          },
          {
            text: 'Settings',
            url: { name: 'settings' }
          }
        ]
      },

      footer: {
        navigation: [],
        meta: {
          visuallyHiddenTitle: 'Support links',
          items: []
        }
      }
    }
  }
}
</script>

<style lang="scss">
$govuk-fonts-path: '../node_modules/govuk-frontend/govuk/assets/fonts/';
@import 'govuk-frontend/govuk/all.scss';

.custom-table__header--clickable {
  &:hover {
    background-color: govuk-colour('light-grey');
    cursor: pointer;
  }
}

.custom-icon {
  @extend .govuk-\!-margin-left-1;

  &.custom-icon--inactive {
    color: govuk-colour('mid-grey');
  }

  &.custom-icon--active {
    color: $govuk-brand-colour;
  }
}
</style>
