<template>
  <gov-width-container>
    <gov-main-wrapper>
      <gov-heading-l>Dashboard</gov-heading-l>

      <gov-button v-if="!$auth.loggedIn" @click="onLogin">Login</gov-button>
      <template v-else>
        <gov-body>Logged in as {{ $auth.user.data.name }}.</gov-body>
        <gov-button @click="onLogout">Logout</gov-button>
      </template>

      <gov-body>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
        voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
        omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
        incidunt delectus?
      </gov-body>
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
    onLogin() {
      this.$auth.loginWith('laravel.passport')
    },

    onLogout() {
      this.$auth.logout()
    }
  }
}
</script>
