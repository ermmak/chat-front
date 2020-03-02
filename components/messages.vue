<template>
  <div class="d-flex flex-column messages-holder">
    <v-alert
      v-for="(message, index) in currentMessages"
      :key="index"
      border="top"
      :class="`align-self-${alignType(message)}`"
      color="success"
      dense
    >
      {{ message.text }}
    </v-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Messages',

  computed: {
    ...mapState('chats', {
      current: ({ current }) => current,
      currentMessages: ({ currentMessages }) => currentMessages
    })
  },

  created () {
    this.listenEvents()
  },

  methods: {
    /**
     * Listen for server events
     */
    listenEvents () {
      if (process.client) {
        this.$echo.private(`chats.${this.$auth.user.id}`)
          .listen(
            '.message.created',
            ({ message }) => message.chat_id === this.$store.commit('chats/addMessage', message)
          )
      }
    },

    /**
     * Message alignment type
     * @param chatId
     * @returns {string}
     */
    alignType ({ chat_id: chatId }) {
      return this.current.id === chatId ? 'end' : 'start'
    },

    /**
     * Messages list
     * @returns {Promise<any>}
     */
    async messagesList () {
      // eslint-disable-next-line no-return-await
      return await this.$axios.$get(`/api/v1/chats/${this.current.id}/messages`)
    }
  }
}
</script>

<style scoped>
.messages-holder {
  padding: 0.7rem;
}
</style>
