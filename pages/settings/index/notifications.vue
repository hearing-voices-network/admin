<template>
  <div>
    <gov-heading-m>Notifications</gov-heading-m>

    <custom-resource-table
      :columns="columns"
      :model="model"
      default-sort="-created_at"
    >
      <template v-slot:0="{ resource: notification }">
        <gov-tag>
          {{ formatStatus(notification) }}
        </gov-tag>
      </template>

      <template v-slot:1="{ resource: notification }">
        {{ formatChannel(notification) }}
      </template>

      <template v-slot:2="{ resource: notification }">
        <gov-link
          v-if="notification.admin_id !== null"
          :url="{
            name: 'admin-users-id',
            params: { id: notification.admin_id }
          }"
          title="Admin user"
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
          title="End user"
          no-visited-state
        >
          {{ notification.recipient }}
        </gov-link>

        <template v-else>
          {{ notification.recipient }}
        </template>
      </template>

      <template v-slot:3="{ resource: notification }">
        {{ $moment(notification.created_at).format('D/M/YYYY HH:mm') }}
      </template>

      <template v-slot:actions="{ resource: notification }">
        <gov-link
          :url="{
            name: 'setting-index-notifications-id',
            params: { id: notification.id }
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
import CustomResourceTable from '~/components/custom/ResourceTable.vue'
import GovHeadingM from '~/components/gov/HeadingM.vue'
import GovLink from '~/components/gov/Link.vue'
import GovTag from '~/components/gov/Tag.vue'
import Notification from '~/models/Notification'

export default {
  components: {
    CustomResourceTable,
    GovHeadingM,
    GovLink,
    GovTag
  },

  data() {
    return {
      columns: [
        {
          heading: 'Status'
        },
        {
          heading: 'Channel'
        },
        {
          heading: 'Recipient'
        },
        {
          heading: 'Date Created',
          sort: 'created_at'
        }
      ],
      model: Notification
    }
  },

  methods: {
    formatStatus(notification) {
      return notification.sent_at === null ? 'pending' : 'sent'
    },

    formatChannel(notification) {
      switch (notification.channel) {
        case 'email':
          return 'Email'
        case 'sms':
          return 'SMS'
        default:
          return notification.channel
      }
    }
  }
}
</script>
