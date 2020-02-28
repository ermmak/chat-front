<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.name"
            label="Name"
            type="text"
            required
            :error-messages="form.errors.get('name')"
          />
        </v-col>

        <v-col cols="12">
          <v-combobox
            v-model="form.users"
            multiple
            label="Users"
            :items="users"
            :error-messages="form.errors.get('name')"
          />
        </v-col>

        <v-col cols="12">
          <v-btn color="primary" type="submit">
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
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
      console.log('submit')
      await this.form.post('/api/v1/register')
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
