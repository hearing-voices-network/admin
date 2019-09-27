<template>
  <div>
    <gov-caption-m>Notifications</gov-caption-m>
    <gov-heading-m>View Notification</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <custom-loader v-if="loadingNotification" class="govuk-!-margin-bottom-0" />

    <gov-summary-list v-else>
      <gov-summary-list-row>
        <gov-summary-list-key>
          Channel
        </gov-summary-list-key>

        <gov-summary-list-value>
          <gov-tag>{{ notification.channel }}</gov-tag>
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Status
        </gov-summary-list-key>

        <gov-summary-list-value>
          <gov-tag>
            {{ notification.sent_at === null ? 'pending' : 'sent' }}
          </gov-tag>
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Recipient
        </gov-summary-list-key>

        <gov-summary-list-value>
          <gov-link
            v-if="notification.admin_id !== null"
            :url="{
              name: 'admin-users-id',
              params: { id: notification.admin_id }
            }"
            no-visited-state
          >
            {{ notification.recipient }}
          </gov-link>

          <gov-link
            v-else-if="notification.end_user_id !== null"
            :url="{
              name: 'end-users-id',
              params: { id: notification.end_user_id }
            }"
            no-visited-state
          >
            {{ notification.recipient }}
          </gov-link>

          <template v-else>
            {{ notification.recipient }}
          </template>
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Recipient type
        </gov-summary-list-key>

        <gov-summary-list-value>
          <gov-tag v-if="notification.admin_id !== null">admin</gov-tag>
          <gov-tag v-else-if="notification.end_user_id !== null">
            end user
          </gov-tag>
          <gov-tag v-else>guest</gov-tag>
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Content
        </gov-summary-list-key>

        <gov-summary-list-value>
          {{ notification.content }}
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Date created
        </gov-summary-list-key>

        <gov-summary-list-value>
          {{ $moment(notification.created_at).format('D/M/YYYY HH:mm') }}
        </gov-summary-list-value>
      </gov-summary-list-row>

      <gov-summary-list-row>
        <gov-summary-list-key>
          Date sent
        </gov-summary-list-key>

        <gov-summary-list-value>
          <template v-if="notification.sent_at !== null">
            {{ $moment(notification.sent_at).format('D/M/YYYY HH:mm') }}
          </template>
          <template v-else>
            N/A
          </template>
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
import Notification from '~/models/Notification'

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
      loadingNotification: false,
      notification: null
    }
  },

  created() {
    this.fetchNotification()
  },

  methods: {
    async fetchNotification() {
      this.loadingNotification = true

      this.notification = await Notification.$find(this.$route.params.id)

      this.loadingNotification = false
    }
  }
}
</script>
