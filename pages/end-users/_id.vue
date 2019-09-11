<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <custom-loader v-if="loadingEndUser" class="govuk-!-margin-bottom-0" />

      <gov-grid-row v-else>
        <gov-grid-column-two-thirds>
          <gov-caption-l>End Users</gov-caption-l>
          <gov-heading-l>View End User</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <gov-summary-list>
            <gov-summary-list-row>
              <gov-summary-list-key>
                Email
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ endUser.email }}
              </gov-summary-list-value>
            </gov-summary-list-row>
          </gov-summary-list>

          <gov-button
            v-if="!showDeleteWarning"
            warning
            type="button"
            @click="onShowDeleteWarning"
          >
            Delete
          </gov-button>

          <template v-else>
            <gov-warning-text>
              This action is irreversible. Please be absolutely sure that you
              want to permanently delete this end user before continuing.
            </gov-warning-text>

            <gov-button
              secondary
              type="button"
              :disabled="endUser.submitting"
              @click="onHideDeleteWarning"
            >
              Cancel
            </gov-button>

            <gov-button
              warning
              :disabled="endUser.submitting"
              @click="onDelete"
            >
              <template v-if="!endUser.submitting">
                Delete
              </template>
              <template v-else>
                Deleting...
              </template>
            </gov-button>
          </template>
        </gov-grid-column-two-thirds>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CustomLoader from '~/components/custom/Loader.vue'
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovButton from '~/components/gov/Button.vue'
import GovCaptionL from '~/components/gov/CaptionL.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWarningText from '~/components/gov/WarningText.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import GovSummaryList from '~/components/gov/SummaryList.vue'
import GovSummaryListKey from '~/components/gov/summary-list/Key.vue'
import GovSummaryListRow from '~/components/gov/summary-list/Row.vue'
import GovSummaryListValue from '~/components/gov/summary-list/Value.vue'
import EndUser from '~/models/EndUser'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    GovBody,
    GovBreadcrumbs,
    GovButton,
    GovCaptionL,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovMainWrapper,
    GovWarningText,
    GovWidthContainer,
    GovSummaryList,
    GovSummaryListKey,
    GovSummaryListRow,
    GovSummaryListValue
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
          text: 'View End User'
        }
      ],
      loadingEndUser: false,
      endUser: null,
      showDeleteWarning: false
    }
  },

  created() {
    this.fetchEndUser()
  },

  methods: {
    async fetchEndUser() {
      this.loadingEndUser = true

      this.endUser = await EndUser.$find(this.$route.params.id)

      this.loadingEndUser = false
    },

    onShowDeleteWarning() {
      this.showDeleteWarning = true
    },

    onHideDeleteWarning() {
      this.showDeleteWarning = false
    },

    async onDelete() {
      await this.endUser.delete()
      this.$router.push({ name: 'end-users' })
    }
  }
}
</script>
