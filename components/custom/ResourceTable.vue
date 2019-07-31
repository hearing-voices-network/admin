<template>
  <custom-loader v-if="loading" />

  <div v-else>
    <gov-table>
      <gov-table-head>
        <gov-table-row>
          <gov-table-header
            v-for="(column, headerIndex) in columns"
            :key="`custom::ResourceTable::header::${headerIndex}`"
            :clickable="isSortable(column)"
            @click.native="onSort(column)"
          >
            {{ column.heading }}
            <template v-if="isSortable(column)">
              <font-awesome-icon
                v-if="isCurrentSort(column) && isAsc"
                icon="sort-up"
                class="custom-icon custom-icon--active"
                title="Ascending"
              />

              <font-awesome-icon
                v-else-if="isCurrentSort(column) && isDesc"
                icon="sort-down"
                class="custom-icon custom-icon--active"
                title="Descending"
              />

              <font-awesome-icon
                v-else
                icon="sort"
                class="custom-icon custom-icon--inactive"
                title="Unsorted"
              />
            </template>
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
            <slot :name="columnIndex" :resource="resource" />
          </gov-table-cell>

          <gov-table-cell numeric>
            <slot name="actions" :resource="resource" />
          </gov-table-cell>
        </gov-table-row>

        <gov-table-row v-if="noResources">
          <gov-table-cell :colspan="columns.length + 1">
            None found
          </gov-table-cell>
        </gov-table-row>
      </gov-table-body>
    </gov-table>

    <custom-pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @previous="onPrevious"
      @next="onNext"
    />
  </div>
</template>

<script>
import CustomLoader from '~/components/custom/Loader.vue'
import CustomPagination from '~/components/custom/Pagination.vue'
import GovTable from '~/components/gov/Table.vue'
import GovTableBody from '~/components/gov/table/Body.vue'
import GovTableRow from '~/components/gov/table/Row.vue'
import GovTableHead from '~/components/gov/table/Head.vue'
import GovTableHeader from '~/components/gov/table/Header.vue'
import GovTableCell from '~/components/gov/table/Cell.vue'

export default {
  components: {
    CustomLoader,
    CustomPagination,
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

    defaultSort: {
      type: String,
      required: false,
      default: ''
    }
  },

  data() {
    return {
      resources: [],
      loading: false,
      currentPage: 1,
      totalPages: 1,
      sort: this.defaultSort
    }
  },

  computed: {
    noResources() {
      return this.resources.length === 0
    },

    sortDirection() {
      return this.sort.charAt(0) === '-' ? 'desc' : 'asc'
    },

    isAsc() {
      return this.sortDirection === 'asc'
    },

    isDesc() {
      return this.sortDirection === 'desc'
    }
  },

  created() {
    this.fetchResources()
  },

  methods: {
    async fetchResources() {
      this.loading = true

      const { data, meta } = await this.model
        .orderBy(this.sort)
        .page(this.currentPage)
        .get()
      this.resources = data
      this.currentPage = meta.current_page
      this.totalPages = meta.last_page

      this.$emit('fetched', this.resources)

      this.loading = false
    },

    onPrevious() {
      this.currentPage = this.currentPage - 1
      this.fetchResources()
    },

    onNext() {
      this.currentPage = this.currentPage + 1
      this.fetchResources()
    },

    onSort(column) {
      const currentSortField = this.isDesc ? this.sort.substr(1) : this.sort

      const columnSortField = column.sort

      // Do nothing if the field is not sortable.
      if (typeof columnSortField === 'undefined') {
        return
      }

      if (currentSortField !== columnSortField) {
        // If not the current sort.
        this.sort = columnSortField
      } else if (this.isAsc) {
        // If it is the current sort (toggle asc/desc).
        this.sort = `-${columnSortField}`
      } else {
        this.sort = columnSortField
      }

      // Refetch the resources.
      this.fetchResources()
    },

    isSortable(column) {
      return typeof column.sort !== 'undefined'
    },

    isCurrentSort(column) {
      const currentSortField = this.isDesc ? this.sort.substr(1) : this.sort

      return column.sort === currentSortField
    }
  }
}
</script>
