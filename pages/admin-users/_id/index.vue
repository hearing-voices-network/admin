<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper v-if="loadingAdmin">
      <custom-loader class="govuk-!-margin-bottom-0" />
    </gov-main-wrapper>

    <gov-main-wrapper v-else>
      <gov-grid-row>
        <gov-grid-column-two-thirds>
          <gov-caption-l>Admin Users</gov-caption-l>
          <gov-heading-l>View Admin User</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <gov-summary-list>
            <gov-summary-list-row>
              <gov-summary-list-key>
                Name
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ admin.name }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Phone
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ admin.phone }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Email
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ admin.email }}
              </gov-summary-list-value>
            </gov-summary-list-row>
          </gov-summary-list>

          <template v-if="!showDeleteWarning">
            <gov-button secondary type="button" @click="onEdit">
              Edit
            </gov-button>

            <gov-button warning type="button" @click="onShowDeleteWarning">
              Delete
            </gov-button>
          </template>

          <template v-else>
            <gov-warning-text>
              This action is irreversible. Please be absolutely sure that you
              want to permanently delete this admin user before continuing.
            </gov-warning-text>

            <gov-button
              secondary
              type="button"
              :disabled="admin.submitting"
              @click="onHideDeleteWarning"
            >
              Cancel
            </gov-button>

            <gov-button warning :disabled="admin.submitting" @click="onDelete">
              <template v-if="!admin.submitting">
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
import Admin from '~/models/Admin'

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
          text: 'Admin Users',
          url: { name: 'admin-users' }
        },
        {
          text: 'View Admin User'
        }
      ],
      loadingAdmin: false,
      admin: null,
      showDeleteWarning: false
    }
  },

  created() {
    this.fetchAdmin()
  },

  methods: {
    async fetchAdmin() {
      this.loadingAdmin = true

      this.admin = await Admin.$find(this.$route.params.id)

      this.loadingAdmin = false
    },

    onShowDeleteWarning() {
      this.showDeleteWarning = true
    },

    onHideDeleteWarning() {
      this.showDeleteWarning = false
    },

    async onDelete() {
      await this.admin.delete()
      this.$router.push({ name: 'admin-users' })
    },

    onEdit() {
      this.$router.push({
        name: 'admin-users-id-edit',
        params: { id: this.$route.params.id }
      })
    }
  }
}
</script>
