export const state = () => ({
  list: [],
  users: [],
  mode: 'list',
  current: null
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
   * Add chat to list
   * @param state
   * @param chat
   */
  addChat: (state, chat) => {
    state.list.push(chat)
  },

  /**
   * Set current selected chat
   * @param state
   * @param current
   */
  setCurrent: (state, current) => {
    state.current = current
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
