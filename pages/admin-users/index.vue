<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column-two-thirds>
          <gov-heading-l>Admin Users</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <gov-button type="button" @click="onAddAdmin">Add admin</gov-button>
        </gov-grid-column-two-thirds>
      </gov-grid-row>

      <gov-grid-row>
        <gov-grid-column-full>
          <custom-resource-table
            :columns="columns"
            :model="model"
            default-sort="name"
          >
            <template v-slot:0="{ resource: admin }">
              {{ admin.name }}
            </template>

            <template v-slot:1="{ resource: admin }">
              {{ admin.email }}
            </template>

            <template v-slot:2="{ resource: admin }">
              {{ admin.phone }}
            </template>

            <template v-slot:actions="{ resource: admin }">
              <gov-link
                :url="{
                  name: 'admin-users-id',
                  params: { id: admin.id }
                }"
                no-visited-state
              >
                View
              </gov-link>
            </template>
          </custom-resource-table>
        </gov-grid-column-full>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CustomResourceTable from '~/components/custom/ResourceTable.vue'
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovButton from '~/components/gov/Button.vue'
import GovGridColumnFull from '~/components/gov/GridColumnFull.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovLink from '~/components/gov/Link.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import Admin from '~/models/Admin'

export default {
  authenticated: true,

  components: {
    CustomResourceTable,
    GovBody,
    GovBreadcrumbs,
    GovButton,
    GovGridColumnFull,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovLink,
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
          text: 'Admin Users'
        }
      ],
      columns: [
        {
          heading: 'Name',
          sort: 'name'
        },
        {
          heading: 'Email',
          sort: 'email'
        },
        {
          heading: 'Phone',
          sort: 'phone'
        }
      ],
      model: Admin
    }
  },

  methods: {
    onAddAdmin() {
      this.$router.push({ name: 'admin-users-create' })
    }
  }
}
</script>
