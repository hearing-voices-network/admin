<template>
  <div>
    <gov-caption-m>Tags</gov-caption-m>
    <gov-heading-m>View Tag</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <custom-loader v-if="loadingTag" class="govuk-!-margin-bottom-0" />

    <template v-else>
      <gov-summary-list>
        <gov-summary-list-row>
          <gov-summary-list-key>
            Parent tag
          </gov-summary-list-key>

          <gov-summary-list-value>
            {{ tag.parent_tag_id ? tag.parent_tag.name : 'N/A' }}
          </gov-summary-list-value>
        </gov-summary-list-row>

        <gov-summary-list-row>
          <gov-summary-list-key>
            Name
          </gov-summary-list-key>

          <gov-summary-list-value>
            {{ tag.name }}
          </gov-summary-list-value>
        </gov-summary-list-row>
      </gov-summary-list>

      <gov-button
        v-if="!showDeleteWarning"
        warning
        type="button"
        @click="onShowDeleteWarning"
      >
        Delete
      </gov-button>

      <template v-else>
        <gov-warning-text>
          This action is irreversible. Please be absolutely sure that you want
          to permanently delete this tag before continuing.
        </gov-warning-text>

        <gov-button
          secondary
          type="button"
          :disabled="tag.submitting"
          @click="onHideDeleteWarning"
        >
          Cancel
        </gov-button>

        <gov-button warning :disabled="tag.submitting" @click="onDelete">
          <template v-if="!tag.submitting">
            Delete
          </template>
          <template v-else>
            Deleting...
          </template>
        </gov-button>
      </template>
    </template>
  </div>
</template>

<script>
import CustomLoader from '~/components/custom/Loader'
import GovCaptionM from '~/components/gov/CaptionM'
import GovHeadingM from '~/components/gov/HeadingM'
import GovBody from '~/components/gov/Body'
import GovButton from '~/components/gov/Button'
import GovWarningText from '~/components/gov/WarningText'
import GovSummaryList from '~/components/gov/SummaryList'
import GovSummaryListRow from '~/components/gov/summary-list/Row'
import GovSummaryListKey from '~/components/gov/summary-list/Key'
import GovSummaryListValue from '~/components/gov/summary-list/Value'
import Tag from '~/models/Tag'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    GovCaptionM,
    GovHeadingM,
    GovBody,
    GovButton,
    GovWarningText,
    GovSummaryList,
    GovSummaryListRow,
    GovSummaryListKey,
    GovSummaryListValue
  },

  data() {
    return {
      loadingTag: false,
      tag: null,
      showDeleteWarning: false
    }
  },

  created() {
    this.fetchTag()
  },

  methods: {
    async fetchTag() {
      this.loadingTag = true

      this.tag = await Tag.$find(this.$route.params.id)

      if (this.tag.parent_tag_id !== null) {
        this.$set(
          this.tag,
          'parent_tag',
          await Tag.$find(this.tag.parent_tag_id)
        )
      }

      this.loadingTag = false
    },

    onShowDeleteWarning() {
      this.showDeleteWarning = true
    },

    onHideDeleteWarning() {
      this.showDeleteWarning = false
    },

    async onDelete() {
      await this.tag.softDelete()
      this.$router.push({ name: 'settings-index-tags' })
    }
  }
}
</script>
