<template>
  <div class="d-flex fill-height">
    <div class="align-stretch left-component">
      <keep-alive>
        <component :is="leftComponent" @newChat="newChat = true" @saved="newChat = false" @cancel="newChat = false"/>
      </keep-alive>
    </div>

    <div class="flex-grow-1 align-stretch chat-container">
      <chat-container/>
    </div>
  </div>
</template>

<script>
import Chats from '@/components/chats'
import NewChat from '@/components/new-chat'
import ChatContainer from '@/components/chat-container'

export default {
  name: 'Conversations',

  components: { Chats, NewChat, ChatContainer },

  asyncData: async ({ $axios }) => ({
    chats: await $axios.$get('/api/v1/chats')
  }),

  data: () => ({
    newChat: false
  }),

  computed: {
    leftComponent () {
      return this.newChat ? 'new-chat' : 'chats'
    }
  }
}
</script>

<style scoped>
.chat-container {
  background-color: #eeeeee;
}

.left-component {
  border-right: 1px solid #cccccc;
  width: 25rem;
}
</style>
