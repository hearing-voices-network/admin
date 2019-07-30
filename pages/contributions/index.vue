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
            :view-route="viewRoute"
          />
        </gov-grid-column-full>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CustomResourceTable from '~/components/custom/ResourceTable.vue'
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovGridColumnFull from '~/components/gov/GridColumnFull.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'

import Contribution from '~/models/Contribution'

export default {
  components: {
    CustomResourceTable,
    GovBody,
    GovBreadcrumbs,
    GovGridColumnFull,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
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
          text: 'Contributions'
        }
      ],
      columns: [
        {
          heading: 'End User ID',
          render: (contribution) => contribution.end_user_id
        },
        {
          heading: 'Status',
          render: (contribution) => contribution.status
        }
      ],
      model: Contribution,
      viewRoute: (contribution) => ({
        name: 'contributions-show',
        params: { contribution: contribution.id }
      })
    }
  }
}
</script>
