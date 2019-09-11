<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column-two-thirds>
          <gov-heading-l>End Users</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <gov-button type="button" @click="onAddEndUser">
            Add end user
          </gov-button>
        </gov-grid-column-two-thirds>
      </gov-grid-row>

      <gov-grid-row>
        <gov-grid-column-full>
          <custom-resource-table
            :columns="columns"
            :model="model"
            default-sort="email"
          >
            <template v-slot:0="{ resource: endUser }">
              {{ endUser.email }}
            </template>

            <template v-slot:1="{ resource: endUser }">
              {{ endUser.contributions_count }}
            </template>

            <template v-slot:2="{ resource: endUser }">
              {{ endUser.in_review_contributions_count }}
            </template>

            <template v-slot:3="{ resource: endUser }">
              <gov-tag>
                {{ endUser.deleted_at === null ? 'active' : 'deleted' }}
              </gov-tag>
            </template>

            <template v-slot:actions="{ resource: endUser }">
              <gov-link
                :url="{
                  name: 'end-users-id',
                  params: { id: endUser.id }
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
import GovTag from '~/components/gov/Tag.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import EndUser from '~/models/EndUser'

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
    GovTag,
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
          text: 'End Users'
        }
      ],
      columns: [
        {
          heading: 'Email',
          sort: 'email'
        },
        {
          heading: 'Contributions'
        },
        {
          heading: 'Contributions In Review'
        },
        {
          heading: 'Account Status'
        }
      ],
      model: EndUser
    }
  },

  methods: {
    onAddEndUser() {
      this.$route.push({ name: 'end-users-create' })
    }
  }
}
</script>
