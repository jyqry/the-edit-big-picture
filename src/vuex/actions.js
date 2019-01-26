import * as types from './mutation-types'

export const toggleSidebar = ({ commit }) => {
  commit(types.TOGGLE_SIDEBAR)
}

export const setCurrentPage = ({ commit }, data) => {
  commit(types.SET_CURRENT_PAGE, data)
}

export const removePage = ({ commit }, data) => {
  commit(types.REMOVE_PAGE, data)
}

export const setPage = ({ commit }, data) => {
  commit(types.SET_PAGE, data)
}
export const setTheme = ({ commit }, data) => {
  commit(types.SET_THEME, data)
}
export const removeImage = ({ commit }, data) => {
  commit(types.REMOVE_IMAGE, data)
}

export const addNewPage = ({ commit }) => {
  commit(types.ADD_PAGE)
}

export const addAlbum = ({ commit }, data) => {
  commit(types.ADD_ALBUM, data)
}
export const removeAlbum = ({ commit }, data) => {
  commit(types.REMOVE_ALBUM, data)
}

export const addImage = ({ commit }, data) => {
  commit(types.ADD_IMAGE, data)
}
