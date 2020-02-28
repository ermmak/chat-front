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
        @click.prevent="$emit('select', chat)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ chat.name }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-chat</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'Chats',

  data: () => ({
    list: []
  }),

  created () {
    this.watchList()
    this.setList()
  },

  methods: {
    /**
     * Watch list
     */
    watchList () {
      this.$store.watch(({ chats }) => chats.list, (chatList) => {
        this.list = chatList
      })
    },

    /**
     * Load list
     * @returns {Promise<void>}
     */
    async setList () {
      this.$store.commit('chats/setList', await this.$axios.$get('/api/v1/chats'))
    }
  }
}
</script>

<style scoped>

</style>
