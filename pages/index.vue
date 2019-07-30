<template>
  <gov-width-container>
    <gov-main-wrapper>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'

export default {
  components: {
    GovMainWrapper,
    GovWidthContainer
  },

  methods: {
    onLogin() {
      this.$auth.loginWith('laravel.passport')
    }
  }
}
</script>
