<template>
  <gov-width-container>
    <gov-main-wrapper>
      <!-- 404 -->
      <template v-if="error.statusCode === 404">
        <gov-heading-l>Page not found</gov-heading-l>

        <gov-body>If you typed the web address, check it is correct.</gov-body>

        <gov-body>
          If you pasted the web address, check you copied the entire address.
        </gov-body>

        <gov-body>
          If the web address is correct or you selected a link or button, then
          please <gov-link :url="mailto">contact us</gov-link> to report the
          error.
        </gov-body>
      </template>

      <!-- Default for any other errors -->
      <template v-else>
        <gov-heading-l>Error - {{ error.statusCode }}</gov-heading-l>

        <gov-body>{{ error.message }}</gov-body>

        <gov-body>
          Please <gov-link :url="mailto">contact us</gov-link> to report the
          error.
        </gov-body>
      </template>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovLink from '~/components/gov/Link.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'

export default {
  components: {
    GovBody,
    GovHeadingL,
    GovLink,
    GovMainWrapper,
    GovWidthContainer
  },

  props: {
    error: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      mailto: `mailto:${process.env.contactEmail}`
    }
  }
}
</script>
