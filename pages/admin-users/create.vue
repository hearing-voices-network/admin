<template>
  <gov-width-container>
    <gov-breadcrumbs :items="breadcrumbs" />

    <gov-main-wrapper>
      <gov-grid-row>
        <gov-grid-column-two-thirds>
          <gov-caption-l>Admin Users</gov-caption-l>
          <gov-heading-l>Create Admin User</gov-heading-l>

          <gov-body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            voluptate. Quae eius, fuga excepturi enim quam veritatis quidem
            nesciunt omnis aliquam dicta provident laboriosam alias suscipit?
            Soluta ducimus incidunt delectus?
          </gov-body>

          <form @submit.prevent="onCreate">
            <gov-form-group :error="admin.hasErrors('name')">
              <gov-label for="name">Name</gov-label>
              <gov-error-message v-if="admin.hasErrors('name')">
                {{ admin.getError('name') }}
              </gov-error-message>
              <gov-input
                id="name"
                v-model="admin.name"
                type="text"
                :error="admin.hasErrors('name')"
                :disabled="admin.submitting"
                @input="admin.clearErrors('name')"
              />
            </gov-form-group>

            <gov-form-group :error="admin.hasErrors('email')">
              <gov-label for="email">Email</gov-label>
              <gov-error-message v-if="admin.hasErrors('email')">
                {{ admin.getError('email') }}
              </gov-error-message>
              <gov-input
                id="email"
                v-model="admin.email"
                type="email"
                :error="admin.hasErrors('email')"
                :disabled="admin.submitting"
                @input="admin.clearErrors('email')"
              />
            </gov-form-group>

            <gov-form-group :error="admin.hasErrors('phone')">
              <gov-label for="phone">Phone</gov-label>
              <gov-error-message v-if="admin.hasErrors('phone')">
                {{ admin.getError('phone') }}
              </gov-error-message>
              <gov-input
                id="phone"
                v-model="admin.phone"
                type="tel"
                :error="admin.hasErrors('phone')"
                :disabled="admin.submitting"
                @input="admin.clearErrors('phone')"
              />
            </gov-form-group>

            <gov-form-group :error="admin.hasErrors('password')">
              <gov-label for="password">Password</gov-label>
              <gov-error-message v-if="admin.hasErrors('password')">
                {{ admin.getError('password') }}
              </gov-error-message>
              <gov-input
                id="password"
                v-model="admin.password"
                type="password"
                :error="admin.hasErrors('password')"
                :disabled="admin.submitting"
                @input="admin.clearErrors('password')"
              />
            </gov-form-group>

            <gov-button type="submit" :disabled="admin.submitting">
              <template v-if="!admin.submitting">
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
import Admin from '~/models/Admin'

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
          text: 'Admin Users',
          url: { name: 'admin-users' }
        },
        {
          text: 'Create Admin User'
        }
      ],
      admin: new Admin({
        name: null,
        email: null,
        phone: null,
        password: null
      })
    }
  },

  methods: {
    async onCreate() {
      try {
        await this.admin.save()
        console.dir(this.admin)
        this.$router.push({
          name: 'admin-users-id',
          params: { id: this.admin.id }
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
