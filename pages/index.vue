<template>
  <gov-width-container>
    <gov-main-wrapper auto-spacing>
      <gov-heading-l>Dashboard</gov-heading-l>

      <template v-if="$auth.loggedIn">
        <gov-body>Logged in as {{ $auth.user.data.name }}.</gov-body>
        <gov-button warning type="button" @click="onLogout">Logout</gov-button>
      </template>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovButton from '~/components/gov/Button.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'

export default {
  components: {
    GovBody,
    GovButton,
    GovHeadingL,
    GovMainWrapper,
    GovWidthContainer
  },

  methods: {
    async onLogout() {
      await this.$auth.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
