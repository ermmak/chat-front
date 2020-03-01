export const state = () => ({
  list: [],
  users: [],
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
   * Set users list
   * @param state
   * @param users
   */
  setUsers: (state, users) => {
    state.users = users
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
