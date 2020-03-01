<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>

          <v-form @submit.prevent="submit">
            <v-card-text>
              <v-text-field
                v-model="form.email"
                label="Login"
                name="email"
                type="text"
                :error-messages="form.errors.get('email')"
              />

              <v-text-field
                v-model="form.name"
                label="Name"
                name="name"
                type="text"
                :error-messages="form.errors.get('name')"
              />

              <v-text-field
                id="password"
                v-model="form.password"
                label="Password"
                name="password"
                type="password"
                :error-messages="form.errors.get('password')"
              />

              <v-text-field
                id="password"
                v-model="form.password_confirmation"
                label="Password confirmation"
                name="password_confirmation"
                type="password"
                :error-messages="form.errors.get('password_confirmation')"
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
  </v-container>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'Register',

  middleware: 'auth',

  auth: 'guest',

  data: () => ({
    form: null
  }),

  created () {
    this.setForm()
  },

  methods: {
    /**
     * Login
     */
    async submit () {
      try {
        const data = cloneDeep(this.credentials())

        await this.form.post('/api/v1/register')

        await this.$auth.loginWith('local', { data })

        await this.$router.push('/conversations')
      } catch {}
    },

    credentials () {
      return {
        email: this.form.email,
        password: this.form.password
      }
    },

    /**
     * Set form
     */
    setForm () {
      this.form = this.$form({
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
      })
    }
  }
}
</script>
