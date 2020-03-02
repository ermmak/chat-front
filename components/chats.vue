<template>
  <v-list>
    <v-toolbar flat>
      <v-toolbar-title>Conversations</v-toolbar-title>

      <v-spacer/>

      <v-btn icon @click="$emit('newChat')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list-item-group>
      <v-list-item
        v-for="(chat, index) in list"
        :key="index"
        @click.prevent="setCurrentChat(chat)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ chat.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Chats',

  created () {
    this.setList()

    this.listenEvents()
  },

  computed: {
    ...mapState('chats', {
      list: ({ list }) => list
    })
  },

  methods: {
    ...mapMutations({
      setChatList: 'chats/setList',
      addChat: 'chats/addChat',
      setCurrent: 'chats/setCurrent',
      setCurrentMessages: 'chats/setCurrentMessages'
    }),

    /**
     * Load list
     * @returns {Promise<void>}
     */
    async setList () {
      this.setChatList(await this.$axios.$get('/api/v1/chats'))
    },

    /**
     * Set current chat
     */
    async setCurrentChat (chat) {
      this.setCurrent(chat)
      this.setCurrentMessages(
        await this.$axios.$get(`/api/v1/chats/${chat.id}/messages`)
      )
    },

    /**
     * Listen for server events
     */
    listenEvents () {
      if (process.client) {
        this.$echo.private(`chats.${this.$auth.user.id}`)
          .listen('.chat.created', ({ chat }) => this.addChat(chat))
          .listen('.message.created', ({ message }) => console.log(message))
      }
    }
  }
}
</script>

<style scoped>

</style>
