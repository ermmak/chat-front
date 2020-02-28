<template>
  <v-container fluid style="padding: 0">
    <v-row align="center" no-gutters>
      <v-col cols="3">
        <component :is="leftComponent" @newChat="newChat = true"/>
      </v-col>

      <v-col cols="9" v-if="selectedChat.name">
        <v-card outlined>
          <v-toolbar flat>
            <v-toolbar-title>{{ selectedChat.name }}</v-toolbar-title>

            <v-spacer/>

            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chats from '@/components/chats'
import ChatForm from '@/components/chat-form'

export default {
  name: 'Conversations',

  components: { Chats, ChatForm },

  asyncData: async ({ $axios }) => ({
    chats: await $axios.$get('/api/v1/chats')
  }),

  data: () => ({
    newChat: false,

    selectedChat: {
      name: '',
      messages: ''
    }
  }),

  computed: {
    leftComponent () {
      return this.newChat ? 'chat-form' : 'chats'
    }
  },

  methods: {
    /**
     * Show chat
     * @param chat
     */
    async showChat (chat) {
      this.selectedChat.mesages = await this.$axios.$get(`/api/v1/chats/${chat.id}/messages`)

      this.selectedChat.name = chat.name
    }
  }
}
</script>

<style scoped>

</style>
