<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column-two-thirds>
          <gov-caption-l>End Users</gov-caption-l>
          <gov-heading-l>Create End User</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <p>FORM</p>

          <gov-button type="submit" @click="onCreate">
            <template v-if="!endUser.submitting">
              Create
            </template>
            <template v-else>
              Creating...
            </template>
          </gov-button>
        </gov-grid-column-two-thirds>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovButton from '~/components/gov/Button.vue'
import GovCaptionL from '~/components/gov/CaptionL.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import EndUser from '~/models/EndUser'

export default {
  authenticated: true,

  components: {
    GovBody,
    GovBreadcrumbs,
    GovButton,
    GovCaptionL,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovMainWrapper,
    GovWidthContainer
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Dashboard',
          url: { name: 'index' }
        },
        {
          text: 'End Users',
          url: { name: 'end-users' }
        },
        {
          text: 'Create End User'
        }
      ],
      endUser: new EndUser()
    }
  },

  methods: {
    async onCreate() {
      //
    }
  }
}
</script>
