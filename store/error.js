export const state = () => ({
  snackbar: null,
  systemBar: null
})

export const mutations = {
  /**
   * Set snackbar error
   * @param state
   * @param snackbar
   */
  setSnackbar (state, snackbar) {
    state.snackbar = snackbar
  },

  /**
   * Set system bar error
   * @param state
   * @param systemBar
   */
  setSystemBar (state, systemBar) {
    state.systemBar = systemBar
  }
}
