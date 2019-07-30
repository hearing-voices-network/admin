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
          <gov-table>
            <gov-table-head>
              <gov-table-row>
                <gov-table-header>Status</gov-table-header>
                <gov-table-header>Last Updated</gov-table-header>
              </gov-table-row>
            </gov-table-head>
            <gov-table-body>
              <gov-table-row>
                <gov-table-cell>Public</gov-table-cell>
                <gov-table-cell>30/7/2019 13:04</gov-table-cell>
              </gov-table-row>
            </gov-table-body>
          </gov-table>
        </gov-grid-column-full>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovGridColumnFull from '~/components/gov/GridColumnFull.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import GovTable from '~/components/gov/Table.vue'
import GovTableBody from '~/components/gov/table/Body.vue'
import GovTableRow from '~/components/gov/table/Row.vue'
import GovTableHead from '~/components/gov/table/Head.vue'
import GovTableHeader from '~/components/gov/table/Header.vue'
import GovTableCell from '~/components/gov/table/Cell.vue'

export default {
  components: {
    GovBody,
    GovBreadcrumbs,
    GovGridColumnFull,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovMainWrapper,
    GovWidthContainer,
    GovTable,
    GovTableBody,
    GovTableRow,
    GovTableHead,
    GovTableHeader,
    GovTableCell
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
      ]
    }
  }
}
</script>
