<template>
  <v-form @submit.prevent="submit">
    <v-list>
      <v-toolbar flat>
        <v-toolbar-title>New chat</v-toolbar-title>
      </v-toolbar>

      <v-list-item-content>
        <v-col cols="12">
          <v-text-field
            v-model="form.name"
            label="Name"
            type="text"
            required
            :error-messages="form.errors.get('name')"
          />
        </v-col>
      </v-list-item-content>

      <v-list-item-content>
        <v-col cols="12">
          <v-select
            v-model="form.users"
            multiple
            chips
            deletable-chips
            label="Users"
            :items="users"
            :error-messages="form.errors.get('users')"
          />
        </v-col>
      </v-list-item-content>

      <v-list-item-content>
        <v-col cols="3">
          <v-btn color="primary" type="submit">
            Save
          </v-btn>
        </v-col>

        <v-col cols="3">
          <v-btn @click="$emit('cancel')">
            Cancel
          </v-btn>
        </v-col>
      </v-list-item-content>
    </v-list>
  </v-form>
</template>

<script>
export default {
  name: 'ChatForm',

  data: () => ({
    form: null,
    users: []
  }),

  created () {
    this.setForm()
    this.setUsersList()
  },

  methods: {
    async submit () {
      try {
        await this.form.post('/api/v1/chats')

        this.$emit('saved')
      } catch {}
    },

    /**
     * Form
     */
    setForm () {
      this.form = this.$form({
        name: '',
        users: []
      })
    },

    /**
     * Users list
     * @returns {Promise<void>}
     */
    async setUsersList () {
      this.users = (await this.$axios.$get('/api/v1/users')).map(({ id, name }) => ({ text: name, value: id }))
    }
  }
}
</script>

<style scoped>

</style>
