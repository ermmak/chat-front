<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="3">
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>

        <v-form @submit.prevent="submit">
          <v-card-text>
            <v-text-field
              v-model="email"
              label="Login"
              name="email"
              type="text"
              :error-messages="errors.get('email')"
            />

            <v-text-field
              id="password"
              v-model="password"
              label="Password"
              name="password"
              type="password"
              :error-messages="errors.get('password')"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn color="primary" type="submit">
              Login
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Errors from '@/custom/form/errors'

export default {
  name: 'Login',

  middleware: 'auth',

  auth: 'guest',

  data: () => ({
    email: '',
    password: '',
    errors: new Errors()
  }),

  methods: {
    /**
     * Login
     */
    async submit () {
      try {
        this.errors.clear()

        await this.$auth.loginWith('local', { data: this.credentials() })

        await this.$router.push('/conversations')
      } catch (e) {
        this.handleError(e)
      }
    },

    /**
     * Credentials
     */
    credentials () {
      return {
        email: this.email,
        password: this.password
      }
    },

    /**
     * Form submission error handler
     * @param error
     */
    handleError (error) {
      const { data, status } = error.response

      if (status === 422) {
        return this.errors.record(data.errors)
      }

      this.errors.record({ email: [status === 401 ? 'incorrect_credentials' : 'error_occurred'] })
    }
  }
}
</script>

<style scoped>

</style>
