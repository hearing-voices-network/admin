<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <gov-grid-row>
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

            <gov-summary-list-row
              v-if="contribution.status === 'changes_requested'"
            >
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
                <template v-if="contributionTags.length === 0">
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
        </gov-grid-column-two-thirds>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovCaptionL from '~/components/gov/CaptionL.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovLink from '~/components/gov/Link.vue'
import GovList from '~/components/gov/List.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovTag from '~/components/gov/Tag.vue'
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
    GovBody,
    GovBreadcrumbs,
    GovCaptionL,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovLink,
    GovList,
    GovMainWrapper,
    GovTag,
    GovWidthContainer,
    GovSummaryList,
    GovSummaryListKey,
    GovSummaryListRow,
    GovSummaryListValue
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
    }
  },

  async asyncData({ route }) {
    const contribution = await Contribution.$find(route.params.id)
    contribution.end_user = await EndUser.$find(contribution.end_user_id)

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
      contribution,
      allTags: await Tag.hierarchy()
    }
  }
}
</script>
