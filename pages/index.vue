<template>
  <gov-width-container>
    <gov-main-wrapper auto-spacing>
      <template v-if="$store.state.oauth.accessToken">
        <gov-heading-l>Dashboard</gov-heading-l>
        <gov-body>Logged in as {{ $store.state.oauth.user.name }}.</gov-body>
        <gov-button warning type="button" @click="$logout">Logout</gov-button>
      </template>

      <template v-else>
        <gov-heading-l>{{ appName }}</gov-heading-l>
        <gov-body>Click below to login.</gov-body>
        <gov-button start type="button" @click="$login">Login</gov-button>
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

  data() {
    return {
      appName: process.env.appName
    }
  }
}
</script>
