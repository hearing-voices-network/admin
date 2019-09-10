<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <custom-loader
        v-if="loadingContribution"
        class="govuk-!-margin-bottom-0"
      />

      <gov-grid-row v-else>
        <gov-grid-column-two-thirds>
          <gov-caption-l>Contributions</gov-caption-l>
          <gov-heading-l>View Contribution</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <gov-summary-list>
            <gov-summary-list-row>
              <gov-summary-list-key>
                End user
              </gov-summary-list-key>

              <gov-summary-list-value>
                <gov-link
                  :url="{
                    name: 'end-users-id',
                    params: { id: contribution.end_user.id }
                  }"
                  no-visited-state
                >
                  {{ contribution.end_user.email }}
                </gov-link>
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Content
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ contribution.content }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Excerpt
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ contribution.excerpt }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Status
              </gov-summary-list-key>

              <gov-summary-list-value>
                <gov-tag>
                  {{ contribution.status.split('_').join(' ') }}
                </gov-tag>
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row v-if="showChangesRequested">
              <gov-summary-list-key>
                Changes requested
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ contribution.changes_requested }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Date submitted
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{ $moment(contribution.created_at).format('D/M/YYYY HH:mm') }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Status last updated
              </gov-summary-list-key>

              <gov-summary-list-value>
                {{
                  $moment(contribution.status_last_updated_at).format(
                    'D/M/YYYY HH:mm'
                  )
                }}
              </gov-summary-list-value>
            </gov-summary-list-row>

            <gov-summary-list-row>
              <gov-summary-list-key>
                Tags
              </gov-summary-list-key>

              <gov-summary-list-value>
                <custom-loader v-if="loadingAllTags" />

                <template v-else-if="contributionTags.length === 0">
                  No tags
                </template>

                <!-- Parent tags -->
                <gov-list v-else bullet>
                  <li
                    v-for="(parentTag, parentIndex) in contributionTags"
                    :key="
                      `page::contributions::show::parentTag::${parentIndex}`
                    "
                  >
                    {{ parentTag.name }}
                    <gov-list bullet>
                      <li
                        v-for="(childTag, childIndex) in parentTag.children"
                        :key="
                          `page::contributions::show::parentTag::${parentIndex}::childTag::${childIndex}`
                        "
                      >
                        {{ childTag.name }}
                      </li>
                    </gov-list>
                  </li>
                </gov-list>
              </gov-summary-list-value>
            </gov-summary-list-row>
          </gov-summary-list>

          <template v-if="!showChangesRequestedInput && !showDeleteWarning">
            <gov-button v-if="showApproveButton" @click="onApprove">
              Approve
            </gov-button>

            <gov-button
              v-if="showRejectButton"
              warning
              @click="onShowChangesRequested"
            >
              Request changes
            </gov-button>

            <gov-button warning @click="onShowDeleteWarning">
              Delete
            </gov-button>
          </template>

          <form
            v-else-if="showChangesRequestedInput"
            @submit.prevent="onReject"
          >
            <gov-form-group
              :error="contribution.hasErrors('changes_requested')"
            >
              <gov-label for="changes_requested">Changes to request</gov-label>
              <gov-hint>
                Specify what changes you require the end user to make, in order
                to make this submission suitable for public consumption.
              </gov-hint>
              <gov-error-message
                v-if="contribution.hasErrors('changes_requested')"
              >
                {{ contribution.getError('changes_requested') }}
              </gov-error-message>
              <gov-textarea
                id="changes_requested"
                v-model="changesRequested"
                :error="contribution.hasErrors('changes_requested')"
                :disabled="contribution.submitting"
                @input="contribution.clearErrors('changes_requested')"
              />
            </gov-form-group>

            <gov-button
              secondary
              :disabled="contribution.submitting"
              @click="onHideChangesRequested"
            >
              Cancel
            </gov-button>

            <gov-button
              type="submit"
              warning
              :disabled="contribution.submitting"
            >
              <template v-if="!contribution.submitting">
                Request changes
              </template>
              <template v-else>
                Requesting...
              </template>
            </gov-button>
          </form>

          <template v-else-if="showDeleteWarning">
            <gov-warning-text>
              This action is irreversible. Please be absolutely sure that you
              want to permanently delete this contribution before continuing.
            </gov-warning-text>

            <gov-button
              secondary
              :disabled="contribution.submitting"
              @click="onHideDeleteWarning"
            >
              Cancel
            </gov-button>

            <gov-button
              warning
              :disabled="contribution.submitting"
              @click="onDelete"
            >
              <template v-if="!contribution.submitting">
                Delete
              </template>
              <template v-else>
                Deleting...
              </template>
            </gov-button>
          </template>
        </gov-grid-column-two-thirds>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import CustomLoader from '~/components/custom/Loader.vue'
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovButton from '~/components/gov/Button.vue'
import GovCaptionL from '~/components/gov/CaptionL.vue'
import GovErrorMessage from '~/components/gov/ErrorMessage.vue'
import GovFormGroup from '~/components/gov/FormGroup.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovHint from '~/components/gov/Hint.vue'
import GovLabel from '~/components/gov/Label.vue'
import GovLink from '~/components/gov/Link.vue'
import GovList from '~/components/gov/List.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovTag from '~/components/gov/Tag.vue'
import GovTextarea from '~/components/gov/Textarea.vue'
import GovWarningText from '~/components/gov/WarningText.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import GovSummaryList from '~/components/gov/SummaryList.vue'
import GovSummaryListKey from '~/components/gov/summary-list/Key.vue'
import GovSummaryListRow from '~/components/gov/summary-list/Row.vue'
import GovSummaryListValue from '~/components/gov/summary-list/Value.vue'
import Contribution from '~/models/Contribution'
import EndUser from '~/models/EndUser'
import Tag from '~/models/Tag'

export default {
  components: {
    CustomLoader,
    GovBody,
    GovBreadcrumbs,
    GovButton,
    GovCaptionL,
    GovErrorMessage,
    GovFormGroup,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovHint,
    GovLabel,
    GovLink,
    GovList,
    GovMainWrapper,
    GovTag,
    GovTextarea,
    GovWarningText,
    GovWidthContainer,
    GovSummaryList,
    GovSummaryListKey,
    GovSummaryListRow,
    GovSummaryListValue
  },

  data() {
    return {
      breadcrumbs: [
        {
          text: 'Dashboard',
          url: { name: 'index' }
        },
        {
          text: 'Contributions',
          url: { name: 'contributions' }
        },
        {
          text: 'View Contribution'
        }
      ],
      loadingContribution: false,
      contribution: null,
      loadingAllTags: false,
      allTags: null,
      showChangesRequestedInput: false,
      changesRequested: '',
      showDeleteWarning: false
    }
  },

  computed: {
    contributionTags() {
      return this.allTags
        .map((parentTag) => {
          return {
            ...parentTag,
            children: parentTag.children.filter((childTag) => {
              return this.contribution.tags
                .map((contributionTag) => contributionTag.id)
                .includes(childTag.id)
            })
          }
        })
        .filter((parentTag) => parentTag.children.length > 0)
    },

    showChangesRequested() {
      return this.contribution.status === 'changes_requested'
    },

    showApproveButton() {
      return this.contribution.status === 'in_review'
    },

    showRejectButton() {
      return ['public', 'in_review'].includes(this.contribution.status)
    }
  },

  created() {
    this.fetchContribution()
    this.fetchAllTags()
  },

  methods: {
    async fetchContribution() {
      this.loadingContribution = true

      const contribution = await Contribution.$find(this.$route.params.id)
      contribution.end_user = await EndUser.$find(contribution.end_user_id)

      this.contribution = contribution
      this.loadingContribution = false
    },

    async fetchAllTags() {
      this.loadingAllTags = true

      this.allTags = await Tag.hierarchy()

      this.loadingAllTags = false
    },

    async onApprove() {
      await this.contribution.approve()
      this.$router.go()
    },

    onShowChangesRequested() {
      this.showChangesRequestedInput = true
    },

    onHideChangesRequested() {
      this.showChangesRequestedInput = false
    },

    onShowDeleteWarning() {
      this.showDeleteWarning = true
    },

    onHideDeleteWarning() {
      this.showDeleteWarning = false
    },

    async onReject() {
      try {
        await this.contribution.reject(this.changesRequested)
        this.$router.go()
      } catch (error) {
        // Handle requests that failed validation.
        if (!error.response || error.response.status !== 422) {
          throw error
        }
      }
    },

    async onDelete() {
      await this.contribution.delete()
      this.$router.push({ name: 'contributions' })
    }
  }
}
</script>
