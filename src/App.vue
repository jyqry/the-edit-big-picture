<template>
  <div id="app">
    <app-page></app-page>
    <page-setting></page-setting>
    <div id="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppPage from '@/components/layout/AppPage'
import PageSetting from '@/components/layout/PageSetting'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    AppPage,
    PageSetting
  },
  methods: {
    onDrop: function (e) {
      console.log(e)
      e.stopPropagation()
      e.preventDefault()
      var files = e.target.files || e.dataTransfer.files
      if (files) {
        for (let i = 0; i < files.length; i++) {
          var reader = new FileReader()
          reader.onloadend = (e) => {
            this.$store.dispatch('addAlbum', this.dataURItoBlob(e.target.result))
          }
          reader.readAsDataURL(files[i])
        }
      }
    },
    dataURItoBlob: function (dataURI) {
      var byteString = atob(dataURI.split(',')[1])
      // var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      var bb = new Blob([ab])
      return window.URL.createObjectURL(bb)
    }
  },
  computed: {
    page: function () {
      return this.pages[this.currentPage]
    },
    ...mapGetters([
      'album',
      'pages',
      'currentPage'
    ])
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  background-image: url('/static/bg.png');
  background-repeat: repeat;
}
#page {
  margin-left: 240px;
  padding-top: 70px;
}
#album {
  position: fixed;
  bottom: 0;
  left: 0;
  padding-left: 250px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 200px;
  overflow: auto;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .18);
  z-index: 90;
  background-color: #ffffff;
  .image {
    position: relative;
    width: 100px;
    height: 100px;
    float: left;
    text-align: center;
    margin: 0 10px 10px 0;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
    .remove {
      opacity: 0;
      position: absolute;
      top: 5px;
      right: 5px;
      width: 16px;
      height: 16px;
      background-color: #2b2b2b;
      border-radius: 50%;
      background-image: url('~@/assets/svg/small-remove.svg');
      background-repeat: no-repeat;
      background-position: center;
      transition: opacity 300ms;
      cursor: pointer;
    }
    &:hover {
      .remove {
        opacity: 1;
      }
    }
    img {
      max-width: 100px;
      max-height: 100px;
    }
  }
}
</style>
