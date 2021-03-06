<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column-two-thirds>
          <gov-heading-l>Contributions</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>
        </gov-grid-column-two-thirds>
      </gov-grid-row>

      <gov-grid-row>
        <gov-grid-column-full>
          <custom-resource-table
            :columns="columns"
            :model="model"
            default-sort="-created_at"
            @fetched="onFetched"
          >
            <template v-slot:0="{ resource: contribution }">
              <gov-link
                v-if="contribution.end_user"
                :url="{
                  name: 'end-users-id',
                  params: { id: contribution.end_user.id }
                }"
                no-visited-state
                title="End user"
              >
                {{ contribution.end_user.email }}
              </gov-link>

              <custom-loader v-else class="govuk-!-margin-bottom-0" />
            </template>

            <template v-slot:1="{ resource: contribution }">
              {{ contribution.excerpt }}
            </template>

            <template v-slot:2="{ resource: contribution }">
              <gov-tag>{{ contribution.status.split('_').join(' ') }}</gov-tag>
            </template>

            <template v-slot:3="{ resource: contribution }">
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
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CustomLoader from '~/components/custom/Loader.vue'
import CustomResourceTable from '~/components/custom/ResourceTable.vue'
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovGridColumnFull from '~/components/gov/GridColumnFull.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovLink from '~/components/gov/Link.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovTag from '~/components/gov/Tag.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import Contribution from '~/models/Contribution'
import EndUser from '~/models/EndUser'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    CustomResourceTable,
    GovBody,
    GovBreadcrumbs,
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
          text: 'Contributions'
        }
      ],
      columns: [
        {
          heading: 'End User'
        },
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
      model: Contribution
    }
  },

  methods: {
    /**
     * Once the contributions have been fetched, also fetch the end users.
     */
    async onFetched(contributions) {
      // Get the end user IDs.
      const endUserIds = contributions.map(
        (contribution) => contribution.end_user_id
      )

      // Fetch the end users for the contributions.
      const endUsers = await EndUser.whereIn('id', endUserIds).$get()

      // Set the end_user property for each contribution.
      contributions.forEach((contribution) => {
        this.$set(
          contribution,
          'end_user',
          endUsers.find((endUser) => endUser.id === contribution.end_user_id)
        )
      })
    }
  }
}
</script>
