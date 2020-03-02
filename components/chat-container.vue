<template>
  <div class="fill-height d-flex flex-column">
    <p v-if="!current" class="text-center font-weight-medium">Please, select a chat!</p>

    <template v-if="current">
      <div class="header">
        <v-toolbar flat>
          <v-toolbar-title>{{ current.name }}</v-toolbar-title>

          <v-spacer/>

          <v-btn icon v-if="current.pivot.is_admin" @click="edit = true">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar>
      </div>

      <div class="flex-grow-1">
        <component :is="centerComponent"/>
      </div>

      <div class="footer" v-if="!edit">
        <v-text-field
          v-model="message"
          flat
          label="Message"
          placeholder="Type here"
          @keyup.enter="sendMessage"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Messages from '@/components/messages'

export default {
  name: 'ChatContainer',

  components: { Messages },

  data: () => ({
    edit: false,
    message: ''
  }),

  computed: {
    ...mapState('chats', {
      current: ({ current }) => current
    }),

    /**
     * Center component
     * @returns {string}
     */
    centerComponent () {
      return this.edit ? 'edit-chat' : 'messages'
    }
  },

  methods: {
    /**
     * Send message
     * @returns {Promise<void>}
     */
    async sendMessage () {
      await this.$axios.$post(`/api/v1/chats/${this.current.id}/messages`, { text: this.message })

      this.message = ''
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
  padding: 4px 0;
}

.footer {
  background-color: #ffffff;
  border-top: 1px solid #cccccc;
  height: 5rem;
  padding: 0.5rem;
}
</style>
