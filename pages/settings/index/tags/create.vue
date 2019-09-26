<template>
  <div>
    <gov-caption-m>Tags</gov-caption-m>
    <gov-heading-m>Create Tag</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <gov-grid-row>
      <gov-grid-column-two-thirds>
        <form @submit.prevent="onCreate">
          <gov-form-group :error="tag.hasErrors('parent_tag_id')">
            <gov-label for="parent_tag_id">Parent tag</gov-label>
            <gov-error-message v-if="tag.hasErrors('parent_tag_id')">
              {{ tag.getError('parent_tag_id') }}
            </gov-error-message>
            <custom-loader v-if="loadingTags" class="govuk-!-margin-bottom-0" />
            <gov-select
              v-else
              id="parent_tag_id"
              v-model="tag.parent_tag_id"
              :options="[
                { value: null, text: 'No parent tag' },
                ...tags.map((tag) => ({ value: tag.id, text: tag.name }))
              ]"
              :error="tag.hasErrors('parent_tag_id')"
              :disabled="tag.submitting"
              @input="tag.clearErrors('parent_tag_id')"
            />
          </gov-form-group>

          <gov-form-group :error="tag.hasErrors('name')">
            <gov-label for="name">Name</gov-label>
            <gov-error-message v-if="tag.hasErrors('name')">
              {{ tag.getError('name') }}
            </gov-error-message>
            <gov-input
              id="name"
              v-model="tag.name"
              type="text"
              :error="tag.hasErrors('name')"
              :disabled="tag.submitting"
              @input="tag.clearErrors('name')"
            />
          </gov-form-group>

          <gov-button type="submit" :disabled="tag.submitting">
            <template v-if="!tag.submitting">
              Create
            </template>
            <template v-else>
              Creating...
            </template>
          </gov-button>
        </form>
      </gov-grid-column-two-thirds>
    </gov-grid-row>
  </div>
</template>

<script>
import CustomLoader from '~/components/custom/Loader'
import GovCaptionM from '~/components/gov/CaptionM'
import GovHeadingM from '~/components/gov/HeadingM'
import GovBody from '~/components/gov/Body'
import GovFormGroup from '~/components/gov/FormGroup'
import GovLabel from '~/components/gov/Label'
import GovErrorMessage from '~/components/gov/ErrorMessage'
import GovSelect from '~/components/gov/Select'
import GovInput from '~/components/gov/Input'
import GovGridRow from '~/components/gov/GridRow'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds'
import GovButton from '~/components/gov/Button'
import Tag from '~/models/Tag'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    GovCaptionM,
    GovHeadingM,
    GovBody,
    GovFormGroup,
    GovLabel,
    GovErrorMessage,
    GovSelect,
    GovInput,
    GovGridRow,
    GovGridColumnTwoThirds,
    GovButton
  },

  data() {
    return {
      tag: new Tag({
        parent_tag_id: null,
        name: null
      }),
      loadingTags: false,
      tags: []
    }
  },

  created() {
    this.fetchTags()
  },

  methods: {
    async fetchTags() {
      this.loadingTags = true

      this.tags = await Tag.hierarchy()

      this.loadingTags = false
    },

    async onCreate() {
      try {
        await this.tag.save()
        this.$router.push({ name: 'settings-index-tags' })
      } catch (error) {
        // Handle requests that failed validation.
        if (!error.response || error.response.status !== 422) {
          throw error
        }
      }
    }
  }
}
</script>
