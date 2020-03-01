<template>
  <v-app light>
    <v-app-bar app dense flat>
      <v-toolbar-title>
        Chat
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <template v-if="!$auth.loggedIn">
          <v-btn text to="/register" nuxt>
            <v-icon left>
              mdi-account-plus-outline
            </v-icon> Registration
          </v-btn>

          <v-btn text to="/login" nuxt>
            <v-icon left>
              mdi-login
            </v-icon> Login
          </v-btn>
        </template>

        <v-btn v-if="$auth.loggedIn" text @click="logout">
          <v-icon left>
            mdi-logout
          </v-icon> Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <error-notification />
  </v-app>
</template>

<script>
import ErrorNotification from '@/components/ErrorNotification'

export default {
  name: 'Default',

  components: { ErrorNotification },

  methods: {
    /**
     * Logout current user
     * @returns {Promise<void>}
     */
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
