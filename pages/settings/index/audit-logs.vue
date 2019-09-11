<template>
  <div>
    <gov-heading-m>Audit Logs</gov-heading-m>

    <custom-resource-table
      :columns="columns"
      :model="model"
      default-sort="-created_at"
      @fetched="onFetched"
    >
      <template v-slot:0="{ resource: audit }">
        <gov-tag>
          {{ audit.action }}
        </gov-tag>
      </template>

      <template v-slot:1="{ resource: audit }">
        {{ audit.description }}
      </template>

      <template v-slot:2="{ resource: audit }">
        <template v-if="audit.admin_id === null && audit.end_user_id === null">
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
      </template>

      <template v-slot:3="{ resource: audit }">
        {{ $moment(audit.created_at).format('D/M/YYYY HH:mm') }}
      </template>

      <template v-slot:actions="{ resource: audit }">
        <gov-link
          :url="{
            name: 'setting-index-audit-logs-id',
            params: { id: audit.id }
          }"
          no-visited-state
        >
          View
        </gov-link>
      </template>
    </custom-resource-table>
  </div>
</template>

<script>
import CustomLoader from '~/components/custom/Loader.vue'
import CustomResourceTable from '~/components/custom/ResourceTable.vue'
import GovHeadingM from '~/components/gov/HeadingM.vue'
import GovLink from '~/components/gov/Link.vue'
import GovTag from '~/components/gov/Tag.vue'
import Admin from '~/models/Admin'
import Audit from '~/models/Audit'
import EndUser from '~/models/EndUser'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    CustomResourceTable,
    GovHeadingM,
    GovLink,
    GovTag
  },

  data() {
    return {
      columns: [
        {
          heading: 'Action'
        },
        {
          heading: 'Description'
        },
        {
          heading: 'User'
        },
        {
          heading: 'Date Created',
          sort: 'created_at'
        }
      ],
      model: Audit
    }
  },

  methods: {
    /**
     * Once the audits have been fetched, also fetch the admins and end users.
     */
    async onFetched(audits) {
      // Get the admin IDs.
      const adminIds = audits
        .filter((audit) => audit.admin_id !== null)
        .map((audit) => audit.admin_id)

      // Get the end user IDs.
      const endUserIds = audits
        .filter((audit) => audit.end_user_id !== null)
        .map((audit) => audit.end_user_id)

      // Fetch the admins and end users for the contributions.
      const admins =
        adminIds.length > 0 ? await Admin.whereIn('id', adminIds).$get() : []
      const endUsers =
        endUserIds.length > 0
          ? await EndUser.whereIn('id', endUserIds).$get()
          : []

      // Set the admin or end_user property for each contribution.
      audits.forEach((audit) => {
        if (audit.admin_id !== null) {
          this.$set(
            audit,
            'admin',
            admins.find((admin) => admin.id === audit.admin_id)
          )
        } else {
          this.$set(
            audit,
            'end_user',
            endUsers.find((endUser) => endUser.id === audit.end_user_id)
          )
        }
      })
    }
  }
}
</script>
