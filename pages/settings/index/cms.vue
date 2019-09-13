<template>
  <div>
    <gov-heading-m>CMS</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <gov-grid-row>
      <gov-grid-column-two-thirds>
        <gov-heading-s>Frontend content</gov-heading-s>
      </gov-grid-column-two-thirds>
    </gov-grid-row>
  </div>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingM from '~/components/gov/HeadingM.vue'
import GovHeadingS from '~/components/gov/HeadingS.vue'
import Settings from '~/models/Settings'

export default {
  authenticated: true,

  components: {
    GovBody,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingM,
    GovHeadingS
  },

  data() {
    return {
      loadingSettings: false,
      settings: null
    }
  },

  created() {
    this.fetchSettings()
  },

  methods: {
    async fetchSettings() {
      this.loadingSettings = true

      this.settings = await Settings.$get()

      this.loadingSettings = false
    }
  }
}
</script>
