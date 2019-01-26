import * as types from '../mutation-types'

const state = {
  sidebar: true,
  currentPage: 0,
  pages: [
    {
      theme: {
        watermark: 'none',
        backgroundColor: '#FFFFFF',
        backgroundImage: '',
        device: 'apple-iphone-x',
        deviceSize: {
          width: 550
        },
        canvas: {
          width: 1000,
          height: 1000,
          deviceZoom: 100
        },
        padding: {
          canvasTop: 60,
          canvasLeft: 0,
          gutter: 70,
          deviceTop: 0,
          deviceGutter: 20
        }
      },
      images: []
    }
  ],
  album: []
}

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const mutations = {
  [types.TOGGLE_SIDEBAR] (state) {
    state.sidebar = !state.sidebar
  },
  [types.SET_CURRENT_PAGE] (state, data) {
    state.currentPage = data
  },
  [types.REMOVE_PAGE] (state, data) {
    state.pages.splice(data, 1)
  },
  [types.SET_THEME] (state, data) {
    let page = JSON.parse(JSON.stringify(state.pages[state.currentPage]))
    page.theme = data.theme
    state.pages.splice(state.currentPage, 1, page)
  },
  [types.REMOVE_IMAGE] (state, data) {
    let page = JSON.parse(JSON.stringify(state.pages[state.currentPage]))
    page.images.splice(data, 1)
    state.pages.splice(state.currentPage, 1, page)
  },
  [types.SET_PAGE] (state, data) {
    state.pages.splice(state.currentPage, 1, data)
  },
  [types.ADD_PAGE] (state) {
    state.pages.splice(state.pages.length, 0, state.pages[state.pages.length - 1])
  },
  [types.ADD_IMAGE] (state, data) {
    let page = JSON.parse(JSON.stringify(state.pages[state.currentPage]))
    page.images.push(data)
    state.pages.splice(state.currentPage, 1, page)
  },
  [types.ADD_ALBUM] (state, data) {
    state.album.push(data)
  },
  [types.REMOVE_ALBUM] (state, data) {
    state.album.splice(data, 1)
  }
}

export default {
  state,
  mutations
}
