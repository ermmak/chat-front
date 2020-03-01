<template>
  <v-snackbar v-model="show" color="error">
    {{ message }}
    <v-btn text dark @click.native="show = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'ErrorNotification',

  data: () => ({
    show: false,
    message: ''
  }),

  /**
   * Created hook
   */
  created () {
    this.$store.watch(state => state.error.snackbar, (snackbar) => {
      if (snackbar) {
        this.show = true
        this.message = snackbar.message
        this.$store.commit('error/setSnackbar', null)
      }
    })
  }
}
</script>

<style scoped>

</style>
