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

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                Updated contribution (admin)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.admin.updated_contribution.subject'
                )
              "
            >
              <gov-label for="email_content.admin.updated_contribution.subject">
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.admin.updated_contribution.subject'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.admin.updated_contribution.subject'
                  )
                }}
              </gov-error-message>
              <gov-input
                id="email_content.admin.updated_contribution.subject"
                v-model="
                  settings.email_content.admin.updated_contribution.subject
                "
                type="text"
                :error="
                  settings.hasErrors(
                    'email_content.admin.updated_contribution.subject'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.admin.updated_contribution.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.admin.updated_contribution.body'
                )
              "
            >
              <gov-label for="email_content.admin.updated_contribution.body">
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.admin.updated_contribution.body'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.admin.updated_contribution.body'
                  )
                }}
              </gov-error-message>
              <gov-textarea
                id="email_content.admin.updated_contribution.body"
                v-model="settings.email_content.admin.updated_contribution.body"
                :error="
                  settings.hasErrors(
                    'email_content.admin.updated_contribution.body'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.admin.updated_contribution.body'
                  )
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                New end user (admin)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors('email_content.admin.new_end_user.subject')
              "
            >
              <gov-label for="email_content.admin.new_end_user.subject">
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors('email_content.admin.new_end_user.subject')
                "
              >
                {{
                  settings.getError('email_content.admin.new_end_user.subject')
                }}
              </gov-error-message>
              <gov-input
                id="email_content.admin.new_end_user.subject"
                v-model="settings.email_content.admin.new_end_user.subject"
                type="text"
                :error="
                  settings.hasErrors('email_content.admin.new_end_user.subject')
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.admin.new_end_user.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors('email_content.admin.new_end_user.body')
              "
            >
              <gov-label for="email_content.admin.new_end_user.body">
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors('email_content.admin.new_end_user.body')
                "
              >
                {{ settings.getError('email_content.admin.new_end_user.body') }}
              </gov-error-message>
              <gov-textarea
                id="email_content.admin.new_end_user.body"
                v-model="settings.email_content.admin.new_end_user.body"
                :error="
                  settings.hasErrors('email_content.admin.new_end_user.body')
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors('email_content.admin.new_end_user.body')
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                Password reset (admin)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors('email_content.admin.password_reset.subject')
              "
            >
              <gov-label for="email_content.admin.password_reset.subject">
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.admin.password_reset.subject'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.admin.password_reset.subject'
                  )
                }}
              </gov-error-message>
              <gov-input
                id="email_content.admin.password_reset.subject"
                v-model="settings.email_content.admin.password_reset.subject"
                type="text"
                :error="
                  settings.hasErrors(
                    'email_content.admin.password_reset.subject'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.admin.password_reset.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors('email_content.admin.password_reset.body')
              "
            >
              <gov-label for="email_content.admin.password_reset.body">
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors('email_content.admin.password_reset.body')
                "
              >
                {{
                  settings.getError('email_content.admin.password_reset.body')
                }}
              </gov-error-message>
              <gov-textarea
                id="email_content.admin.password_reset.body"
                v-model="settings.email_content.admin.password_reset.body"
                :error="
                  settings.hasErrors('email_content.admin.password_reset.body')
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.admin.password_reset.body'
                  )
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                Email confirmation (end user)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.end_user.email_confirmation.subject'
                )
              "
            >
              <gov-label
                for="email_content.end_user.email_confirmation.subject"
              >
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.email_confirmation.subject'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.email_confirmation.subject'
                  )
                }}
              </gov-error-message>
              <gov-input
                id="email_content.end_user.email_confirmation.subject"
                v-model="
                  settings.email_content.end_user.email_confirmation.subject
                "
                type="text"
                :error="
                  settings.hasErrors(
                    'email_content.end_user.email_confirmation.subject'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.email_confirmation.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.end_user.email_confirmation.body'
                )
              "
            >
              <gov-label for="email_content.end_user.email_confirmation.body">
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.email_confirmation.body'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.email_confirmation.body'
                  )
                }}
              </gov-error-message>
              <gov-textarea
                id="email_content.end_user.email_confirmation.body"
                v-model="
                  settings.email_content.end_user.email_confirmation.body
                "
                :error="
                  settings.hasErrors(
                    'email_content.end_user.email_confirmation.body'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.email_confirmation.body'
                  )
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                Password reset (end user)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.end_user.password_reset.subject'
                )
              "
            >
              <gov-label for="email_content.end_user.password_reset.subject">
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.password_reset.subject'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.password_reset.subject'
                  )
                }}
              </gov-error-message>
              <gov-input
                id="email_content.end_user.password_reset.subject"
                v-model="settings.email_content.end_user.password_reset.subject"
                type="text"
                :error="
                  settings.hasErrors(
                    'email_content.end_user.password_reset.subject'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.password_reset.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors('email_content.end_user.password_reset.body')
              "
            >
              <gov-label for="email_content.end_user.password_reset.body">
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.password_reset.body'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.password_reset.body'
                  )
                }}
              </gov-error-message>
              <gov-textarea
                id="email_content.end_user.password_reset.body"
                v-model="settings.email_content.end_user.password_reset.body"
                :error="
                  settings.hasErrors(
                    'email_content.end_user.password_reset.body'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.password_reset.body'
                  )
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                Contribution approved (end user)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.end_user.contribution_approved.subject'
                )
              "
            >
              <gov-label
                for="email_content.end_user.contribution_approved.subject"
              >
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.contribution_approved.subject'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.contribution_approved.subject'
                  )
                }}
              </gov-error-message>
              <gov-input
                id="email_content.end_user.contribution_approved.subject"
                v-model="
                  settings.email_content.end_user.contribution_approved.subject
                "
                type="text"
                :error="
                  settings.hasErrors(
                    'email_content.end_user.contribution_approved.subject'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.contribution_approved.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.end_user.contribution_approved.body'
                )
              "
            >
              <gov-label
                for="email_content.end_user.contribution_approved.body"
              >
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.contribution_approved.body'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.contribution_approved.body'
                  )
                }}
              </gov-error-message>
              <gov-textarea
                id="email_content.end_user.contribution_approved.body"
                v-model="
                  settings.email_content.end_user.contribution_approved.body
                "
                :error="
                  settings.hasErrors(
                    'email_content.end_user.contribution_approved.body'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.contribution_approved.body'
                  )
                "
              />
            </gov-form-group>
          </gov-fieldset>

          <gov-fieldset>
            <gov-fieldset-legend size="s">
              <gov-fieldset-heading tag="h5">
                Contribution rejected (end user)
              </gov-fieldset-heading>
            </gov-fieldset-legend>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.end_user.contribution_rejected.subject'
                )
              "
            >
              <gov-label
                for="email_content.end_user.contribution_rejected.subject"
              >
                Subject
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.contribution_rejected.subject'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.contribution_rejected.subject'
                  )
                }}
              </gov-error-message>
              <gov-input
                id="email_content.end_user.contribution_rejected.subject"
                v-model="
                  settings.email_content.end_user.contribution_rejected.subject
                "
                type="text"
                :error="
                  settings.hasErrors(
                    'email_content.end_user.contribution_rejected.subject'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.contribution_rejected.subject'
                  )
                "
              />
            </gov-form-group>

            <gov-form-group
              :error="
                settings.hasErrors(
                  'email_content.end_user.contribution_rejected.body'
                )
              "
            >
              <gov-label
                for="email_content.end_user.contribution_rejected.body"
              >
                Body
              </gov-label>
              <gov-error-message
                v-if="
                  settings.hasErrors(
                    'email_content.end_user.contribution_rejected.body'
                  )
                "
              >
                {{
                  settings.getError(
                    'email_content.end_user.contribution_rejected.body'
                  )
                }}
              </gov-error-message>
              <gov-textarea
                id="email_content.end_user.contribution_rejected.body"
                v-model="
                  settings.email_content.end_user.contribution_rejected.body
                "
                :error="
                  settings.hasErrors(
                    'email_content.end_user.contribution_rejected.body'
                  )
                "
                :disabled="settings.submitting"
                @input="
                  settings.clearErrors(
                    'email_content.end_user.contribution_rejected.body'
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
