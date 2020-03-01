export const state = () => ({
  list: [],
  mode: 'list'
})

export const mutations = {
  /**
   * Set list
   * @param state
   * @param list
   */
  setList: (state, list) => {
    state.list = list
  },

  /**
   * Set mode
   * @param state
   * @param mode
   */
  setMode: (state, mode) => {
    state.mode = mode
  }
}
