<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column-two-thirds>
          <gov-caption-l>End Users</gov-caption-l>
          <gov-heading-l>Create End User</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <form @submit.prevent="onCreate">
            <gov-form-group :error="endUser.hasErrors('email')">
              <gov-label for="email">Email</gov-label>
              <gov-error-message v-if="endUser.hasErrors('email')">
                {{ endUser.getError('email') }}
              </gov-error-message>
              <gov-input
                id="email"
                v-model="endUser.email"
                type="email"
                :error="endUser.hasErrors('email')"
                :disabled="endUser.submitting"
                @input="endUser.clearErrors('email')"
              />
            </gov-form-group>

            <gov-form-group :error="endUser.hasErrors('password')">
              <gov-label for="password">Password</gov-label>
              <gov-error-message v-if="endUser.hasErrors('password')">
                {{ endUser.getError('password') }}
              </gov-error-message>
              <gov-input
                id="password"
                v-model="endUser.password"
                type="password"
                :error="endUser.hasErrors('password')"
                :disabled="endUser.submitting"
                @input="endUser.clearErrors('password')"
              />
            </gov-form-group>

            <gov-form-group :error="endUser.hasErrors('country')">
              <gov-label for="country" optional>Country</gov-label>
              <gov-error-message v-if="endUser.hasErrors('country')">
                {{ endUser.getError('country') }}
              </gov-error-message>
              <gov-input
                id="country"
                v-model="endUser.country"
                type="text"
                :error="endUser.hasErrors('country')"
                :disabled="endUser.submitting"
                @input="endUser.clearErrors('country')"
              />
            </gov-form-group>

            <gov-form-group :error="endUser.hasErrors('birth_year')">
              <gov-label for="birth_year" optional>Birth year</gov-label>
              <gov-error-message v-if="endUser.hasErrors('birth_year')">
                {{ endUser.getError('birth_year') }}
              </gov-error-message>
              <gov-input
                id="birth_year"
                v-model="endUser.birth_year"
                class="govuk-input--width-4"
                type="number"
                :error="endUser.hasErrors('birth_year')"
                :disabled="endUser.submitting"
                @input="endUser.clearErrors('birth_year')"
              />
            </gov-form-group>

            <gov-form-group :error="endUser.hasErrors('gender')">
              <gov-label for="gender" optional>Gender</gov-label>
              <gov-error-message v-if="endUser.hasErrors('gender')">
                {{ endUser.getError('gender') }}
              </gov-error-message>
              <gov-input
                id="gender"
                v-model="endUser.gender"
                type="text"
                :error="endUser.hasErrors('gender')"
                :disabled="endUser.submitting"
                @input="endUser.clearErrors('gender')"
              />
            </gov-form-group>

            <gov-form-group :error="endUser.hasErrors('ethnicity')">
              <gov-label for="ethnicity" optional>Ethnicity</gov-label>
              <gov-error-message v-if="endUser.hasErrors('ethnicity')">
                {{ endUser.getError('ethnicity') }}
              </gov-error-message>
              <gov-input
                id="ethnicity"
                v-model="endUser.ethnicity"
                type="text"
                :error="endUser.hasErrors('ethnicity')"
                :disabled="endUser.submitting"
                @input="endUser.clearErrors('ethnicity')"
              />
            </gov-form-group>

            <gov-button type="submit" :disabled="endUser.submitting">
              <template v-if="!endUser.submitting">
                Create
              </template>
              <template v-else>
                Creating...
              </template>
            </gov-button>
          </form>
        </gov-grid-column-two-thirds>
      </gov-grid-row>
    </gov-main-wrapper>
  </gov-width-container>
</template>

<script>
import GovBody from '~/components/gov/Body.vue'
import GovBreadcrumbs from '~/components/gov/Breadcrumbs.vue'
import GovButton from '~/components/gov/Button.vue'
import GovCaptionL from '~/components/gov/CaptionL.vue'
import GovErrorMessage from '~/components/gov/ErrorMessage.vue'
import GovFormGroup from '~/components/gov/FormGroup.vue'
import GovInput from '~/components/gov/Input.vue'
import GovGridColumnTwoThirds from '~/components/gov/GridColumnTwoThirds.vue'
import GovGridRow from '~/components/gov/GridRow.vue'
import GovHeadingL from '~/components/gov/HeadingL.vue'
import GovLabel from '~/components/gov/Label.vue'
import GovMainWrapper from '~/components/gov/MainWrapper.vue'
import GovWidthContainer from '~/components/gov/WidthContainer.vue'
import EndUser from '~/models/EndUser'

export default {
  authenticated: true,

  components: {
    GovBody,
    GovBreadcrumbs,
    GovButton,
    GovCaptionL,
    GovErrorMessage,
    GovFormGroup,
    GovInput,
    GovGridColumnTwoThirds,
    GovGridRow,
    GovHeadingL,
    GovLabel,
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
          text: 'End Users',
          url: { name: 'end-users' }
        },
        {
          text: 'Create End User'
        }
      ],
      endUser: new EndUser({
        email: null,
        password: null,
        country: null,
        birth_year: null,
        gender: null,
        ethnicity: null
      })
    }
  },

  methods: {
    async onCreate() {
      try {
        await this.endUser.save()
        this.$router.push({
          name: 'end-users-id',
          params: { id: this.endUser.id }
        })
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
