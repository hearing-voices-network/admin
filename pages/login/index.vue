<template>
  <gov-width-container>
    <gov-main-wrapper>
      <gov-heading-l>{{ appName }}</gov-heading-l>

      <gov-body>Click below to login.</gov-body>

      <gov-button start type="button" @click="onLogin">Login</gov-button>
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
  },

  methods: {
    onLogin() {
      this.$auth.loginWith('laravel.passport')
    }
  }
}
</script>
