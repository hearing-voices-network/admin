<template>
  <p v-if="loading">Loading...</p>
  <gov-table v-else>
    <gov-table-head>
      <gov-table-row>
        <gov-table-header
          v-for="(column, headerIndex) in columns"
          :key="`custom::ResourceTable::header::${headerIndex}`"
        >
          {{ column.heading }}
        </gov-table-header>

        <gov-table-header numeric />
      </gov-table-row>
    </gov-table-head>

    <gov-table-body>
      <gov-table-row
        v-for="(resource, rowIndex) in resources"
        :key="`custom::ResourceTable::row::${rowIndex}`"
      >
        <gov-table-cell
          v-for="(column, columnIndex) in columns"
          :key="
            `custom::ResourceTable::row::${rowIndex}::column::${columnIndex}`
          "
        >
          {{ column.render(resource) }}
        </gov-table-cell>

        <gov-table-cell numeric>
          <gov-link :url="viewRoute(resource)" no-visited-state>View</gov-link>
        </gov-table-cell>
      </gov-table-row>

      <gov-table-row v-if="noResources">
        <gov-table-cell :colspan="columns.length + 1">
          None found
        </gov-table-cell>
      </gov-table-row>
    </gov-table-body>
  </gov-table>
</template>

<script>
import GovLink from '~/components/gov/Link.vue'
import GovTable from '~/components/gov/Table.vue'
import GovTableBody from '~/components/gov/table/Body.vue'
import GovTableRow from '~/components/gov/table/Row.vue'
import GovTableHead from '~/components/gov/table/Head.vue'
import GovTableHeader from '~/components/gov/table/Header.vue'
import GovTableCell from '~/components/gov/table/Cell.vue'

export default {
  components: {
    GovLink,
    GovTable,
    GovTableBody,
    GovTableRow,
    GovTableHead,
    GovTableHeader,
    GovTableCell
  },

  props: {
    columns: {
      type: Array,
      required: true
    },

    model: {
      type: Function,
      required: true
    },

    viewRoute: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      resources: [],
      loading: false,
      currentPage: 1,
      totalPages: 1
    }
  },

  computed: {
    noResources() {
      return this.resources.length === 0
    }
  },

  created() {
    this.fetchResources()
  },

  methods: {
    async fetchResources() {
      this.loading = true

      const { data, meta } = await this.model.page(this.currentPage).get()
      this.resources = data
      this.currentPage = meta.current_page
      this.totalPages = meta.last_page

      this.loading = false
    },

    onPrevious() {
      this.currentPage = this.currentPage - 1
      this.fetchResources()
    },

    onNext() {
      this.currentPage = this.currentPage + 1
      this.fetchResources()
    }
  }
}
</script>
