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
            @fetched="onFetched"
          >
            <template v-slot:0="{ resource: contribution }">
              <template v-if="contribution.end_user">
                {{ contribution.end_user.email }}
              </template>

              <custom-loader v-else class="govuk-!-margin-bottom-0" />
            </template>

            <template v-slot:1="{ resource: contribution }">
              <gov-tag>{{ contribution.status }}</gov-tag>
            </template>

            <template v-slot:actions="{ resource: contribution }">
              <gov-link
                :url="{
                  name: 'contributions-show',
                  params: { contribution: contribution.id }
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
          heading: 'End User Email'
        },
        {
          heading: 'Status'
        }
      ],
      model: Contribution
    }
  },

  methods: {
    /**
     * Once the contributions have been fetched, also fetch the end users.
     */
    async onFetched(resources) {
      // Get the end user IDs.
      const endUserIds = resources.map((resource) => resource.end_user_id)

      // Fetch the end users for the contributions.
      const endUsers = await EndUser.whereIn('id', endUserIds).$get()

      // Set the end_user property for each contribution.
      resources.forEach((resource) => {
        this.$set(
          resource,
          'end_user',
          endUsers.find((endUser) => endUser.id === resource.end_user_id)
        )
      })
    }
  }
}
</script>
