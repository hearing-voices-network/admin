<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        admin
      </h1>
      <h2 class="subtitle">
        The admin web app for the Connecting Voices platform.
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--grey">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
        <button type="button" class="button--green" @click="onLogin">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/custom/Logo.vue'

export default {
  components: {
    Logo
  },

  methods: {
    onLogin() {
      this.$auth.loginWith('laravel.passport')
    }
  }
}
</script>
