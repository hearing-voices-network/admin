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

            <gov-summary-list-row>
              <gov-summary-list-key>
                Country
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ endUser.country || 'N/A' }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Birth year
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ endUser.birth_year || 'N/A' }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Ethnicity
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ endUser.ethnicity || 'N/A' }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                GDPR consented?
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ endUser.gdpr_consented_at ? 'Yes' : 'No' }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Verified email?
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ endUser.email_verified_at ? 'Yes' : 'No' }}
              </gov-summary-list-value>
            </gov-summary-list-row>
          </gov-summary-list>
        </gov-grid-column-two-thirds>
      </gov-grid-row>

      <gov-grid-row>
        <gov-grid-column-full>
          <gov-heading-m>Contributions</gov-heading-m>

          <custom-resource-table
            :columns="columns"
            :model="model"
            :filters="filters"
            default-sort="-created_at"
          >
            <template v-slot:0="{ resource: contribution }">
              {{ contribution.excerpt }}
            </template>

            <template v-slot:1="{ resource: contribution }">
              <gov-tag>{{ contribution.status.split('_').join(' ') }}</gov-tag>
            </template>

            <template v-slot:2="{ resource: contribution }">
              {{ $moment(contribution.created_at).format('D/M/YYYY HH:mm') }}
            </template>

            <template v-slot:actions="{ resource: contribution }">
              <gov-link
                :url="{
                  name: 'contributions-id',
                  params: { id: contribution.id }
                }"
                no-visited-state
              >
                View
              </gov-link>
            </template>
          </custom-resource-table>
        </gov-grid-column-full>
      </gov-grid-row>

      <gov-grid-row>
        <gov-grid-column-two-thirds>
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
import CustomResourceTable from '~/components/custom/ResourceTable.vue'
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovButton from '~/components/gov/Button.vue'
import GovCaptionL from '~/components/gov/CaptionL.vue'
import GovGridColumnFull from '~/components/gov/GridColumnFull.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovHeadingM from '~/components/gov/HeadingM.vue'
import GovLink from '~/components/gov/Link.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWarningText from '~/components/gov/WarningText.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import GovSummaryList from '~/components/gov/SummaryList.vue'
import GovSummaryListKey from '~/components/gov/summary-list/Key.vue'
import GovSummaryListRow from '~/components/gov/summary-list/Row.vue'
import GovSummaryListValue from '~/components/gov/summary-list/Value.vue'
import GovTag from '~/components/gov/Tag.vue'
import Contribution from '~/models/Contribution'
import EndUser from '~/models/EndUser'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    CustomResourceTable,
    GovBody,
    GovBreadcrumbs,
    GovButton,
    GovCaptionL,
    GovGridColumnFull,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovHeadingM,
    GovLink,
    GovMainWrapper,
    GovWarningText,
    GovWidthContainer,
    GovSummaryList,
    GovSummaryListKey,
    GovSummaryListRow,
    GovSummaryListValue,
    GovTag
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
      showDeleteWarning: false,
      columns: [
        {
          heading: 'Excerpt'
        },
        {
          heading: 'Status'
        },
        {
          heading: 'Date Created',
          sort: 'created_at'
        }
      ],
      model: Contribution,
      filters: [
        {
          field: 'end_user_id',
          value: this.$route.params.id
        }
      ]
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
