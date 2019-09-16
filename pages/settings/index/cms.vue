<template>
  <div>
    <gov-heading-m>CMS</gov-heading-m>

    <gov-body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
      voluptate. Quae eius, fuga excepturi enim quam veritatis quidem nesciunt
      omnis aliquam dicta provident laboriosam alias suscipit? Soluta ducimus
      incidunt delectus?
    </gov-body>

    <custom-loader v-if="loadingSettings" />

    <gov-grid-row v-else>
      <gov-grid-column-two-thirds>
        <form @submit.prevent="onUpdate">
          <gov-heading-s>Frontend content</gov-heading-s>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">Home page</gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="settings.hasErrors('frontend_content.home_page.title')"
            >
              <gov-label for="frontend_content.home_page.title">
                Title
              </gov-label>
              <gov-error-message
                v-if="settings.hasErrors('frontend_content.home_page.title')"
              >
                {{ settings.getError('frontend_content.home_page.title') }}
              </gov-error-message>
              <gov-input
                id="frontend_content.home_page.title"
                v-model="settings.frontend_content.home_page.title"
                type="text"
                :error="settings.hasErrors('frontend_content.home_page.title')"
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors('frontend_content.home_page.title')
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-heading-s>Email content</gov-heading-s>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                New contribution (admin)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.admin.new_contribution.subject'
                )
              "
            >
              <gov-label for="email_content.admin.new_contribution.subject">
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.admin.new_contribution.subject'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.admin.new_contribution.subject'
                  )
                }}
              </gov-error-message>
              <gov-input
                id="email_content.admin.new_contribution.subject"
                v-model="settings.email_content.admin.new_contribution.subject"
                type="text"
                :error="
                  settings.hasErrors(
                    'email_content.admin.new_contribution.subject'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.admin.new_contribution.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors('email_content.admin.new_contribution.body')
              "
            >
              <gov-label for="email_content.admin.new_contribution.body">
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.admin.new_contribution.body'
                  )
                "
              >
                {{
                  settings.getError('email_content.admin.new_contribution.body')
                }}
              </gov-error-message>
              <gov-textarea
                id="email_content.admin.new_contribution.body"
                v-model="settings.email_content.admin.new_contribution.body"
                :error="
                  settings.hasErrors(
                    'email_content.admin.new_contribution.body'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.admin.new_contribution.body'
                  )
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-button type="submit" :disabled="settings.submitting">
            <template v-if="!settings.submitting">
              Update
            </template>
            <template v-else>
              Updating...
            </template>
          </gov-button>
        </form>
      </gov-grid-column-two-thirds>
    </gov-grid-row>
  </div>
</template>

<script>
import CustomLoader from '~/components/custom/Loader.vue'
import GovBody from '~/components/gov/Body.vue'
import GovButton from '~/components/gov/Button.vue'
import GovErrorMessage from '~/components/gov/ErrorMessage.vue'
import GovFieldset from '~/components/gov/Fieldset.vue'
import GovFieldsetHeading from '~/components/gov/fieldset/Heading.vue'
import GovFieldsetLegend from '~/components/gov/fieldset/Legend.vue'
import GovFormGroup from '~/components/gov/FormGroup.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingM from '~/components/gov/HeadingM.vue'
import GovHeadingS from '~/components/gov/HeadingS.vue'
import GovInput from '~/components/gov/Input.vue'
import GovLabel from '~/components/gov/Label.vue'
import GovTextarea from '~/components/gov/Textarea.vue'
import Settings from '~/models/Settings'

export default {
  authenticated: true,

  components: {
    CustomLoader,
    GovBody,
    GovButton,
    GovErrorMessage,
    GovFieldset,
    GovFieldsetHeading,
    GovFieldsetLegend,
    GovFormGroup,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingM,
    GovHeadingS,
    GovInput,
    GovLabel,
    GovTextarea
  },

  data() {
    return {
      loadingSettings: false,
      settings: null
    }
  },

  created() {
    this.fetchSettings()
  },

  methods: {
    async fetchSettings() {
      this.loadingSettings = true

      this.settings = await Settings.$get()

      this.loadingSettings = false
    },

    async onUpdate() {
      await this.settings.save()
      this.$router.go()
    }
  }
}
</script>
