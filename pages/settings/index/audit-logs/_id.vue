<template>
  <div>
    <gov-caption-m>Audit Logs</gov-caption-m>
    <gov-heading-m>View Audit Log</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <custom-loader v-if="loadingAudit" class="govuk-!-margin-bottom-0" />

    <gov-summary-list v-else>
      <gov-summary-list-row>
        <gov-summary-list-key>
          User
        </gov-summary-list-key>

        <gov-summary-list-value>
          <template
            v-if="audit.admin_id === null && audit.end_user_id === null"
          >
            Guest
          </template>

          <gov-link
            v-else-if="audit.admin"
            :url="{
              name: 'admin-users-id',
              params: { id: audit.admin.id }
            }"
            no-visited-state
            title="Admin user"
          >
            {{ audit.admin.email }}
          </gov-link>

          <gov-link
            v-else-if="audit.end_user"
            :url="{
              name: 'end-users-id',
              params: { id: audit.end_user.id }
            }"
            no-visited-state
            title="End user"
          >
            {{ audit.end_user.email }}
          </gov-link>

          <custom-loader v-else class="govuk-!-margin-bottom-0" />
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Client
        </gov-summary-list-key>

        <gov-summary-list-value>
          {{ audit.client || 'N/A' }}
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Action
        </gov-summary-list-key>

        <gov-summary-list-value>
          <gov-tag>{{ audit.action }}</gov-tag>
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Description
        </gov-summary-list-key>

        <gov-summary-list-value>
          {{ audit.description }}
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          IP address
        </gov-summary-list-key>

        <gov-summary-list-value>
          {{ audit.ip_address }}
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          User agent
        </gov-summary-list-key>

        <gov-summary-list-value>
          {{ audit.user_agent || 'N/A' }}
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Date created
        </gov-summary-list-key>

        <gov-summary-list-value>
          {{ $moment(audit.created_at).format('D/M/YYYY HH:mm') }}
        </gov-summary-list-value>
      </gov-summary-list-row>
    </gov-summary-list>
  </div>
</template>

<script>
import CustomLoader from '~/components/custom/Loader'
import GovCaptionM from '~/components/gov/CaptionM'
import GovHeadingM from '~/components/gov/HeadingM'
import GovBody from '~/components/gov/Body'
import GovTag from '~/components/gov/Tag'
import GovLink from '~/components/gov/Link'
import GovSummaryList from '~/components/gov/SummaryList'
import GovSummaryListRow from '~/components/gov/summary-list/Row'
import GovSummaryListKey from '~/components/gov/summary-list/Key'
import GovSummaryListValue from '~/components/gov/summary-list/Value'
import Audit from '~/models/Audit'
import Admin from '~/models/Admin'
import EndUser from '~/models/EndUser'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    GovCaptionM,
    GovHeadingM,
    GovBody,
    GovTag,
    GovLink,
    GovSummaryList,
    GovSummaryListRow,
    GovSummaryListKey,
    GovSummaryListValue
  },

  data() {
    return {
      loadingAudit: false,
      audit: null
    }
  },

  created() {
    this.fetchAudit()
  },

  methods: {
    async fetchAudit() {
      this.loadingAudit = true

      this.audit = await Audit.$find(this.$route.params.id)
      await this.fetchUser()

      this.loadingAudit = false
    },

    async fetchUser() {
      if (this.audit.admin_id !== null) {
        this.$set(this.audit, 'admin', await Admin.$find(this.audit.admin_id))
      } else if (this.audit.end_user_id !== null) {
        this.$set(
          this.audit,
          'end_user',
          await EndUser.$find(this.audit.end_user_id)
        )
      }
    }
  }
}
</script>
