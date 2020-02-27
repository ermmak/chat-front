<template>
  <v-row align="center" no-gutters>
    <v-col cols="3">
      <chats
        v-if="!newChat"
        :list="chats"
        @select="showChat"
      />
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
</template>

<script>
import Chats from '@/components/chats'

export default {
  name: 'Conversations',

  components: { Chats },

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
