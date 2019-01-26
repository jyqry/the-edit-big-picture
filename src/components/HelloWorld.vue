<template>
  <div class="hello" v-if="pages">
    <div class="canvas-settings">
      <div class="zoom">
        줌 <input v-model="zoom" type="range" min="30" max="100"> {{zoom}}%
      </div>
      <div class="zoom">
        <button @click="saveToPng">저장</button>
      </div>
    </div>
    <div id="render" class="render" ref="render" @dragover.prevent @drop="onDrop" v-if="page" v-bind:style="{
        width: `${page.theme.canvas.width}px`,
        height: `${page.theme.canvas.height}px`,
        backgroundColor: page.theme.backgroundColor,
        backgroundImage: `url('${page.theme.backgroundImage}')`,
        zoom: zoom / 100
      }">
      <div class="watermark" v-bind:class="page.theme.watermark">
        <img src="/static/water_gray.png" v-if="page.theme.watermark === 'gray'">
        <img src="/static/water_white.png" v-if="page.theme.watermark === 'white'">
      </div>
      <div v-bind:style="{
          marginTop: `${page.theme.padding.canvasTop}px`,
          marginLeft: `${page.theme.padding.canvasLeft}px`
        }">
        <div class="device" :ref="`device-${index}`" v-for="(image, index) in page.images" :key="index" v-bind:class="page.theme.device" v-bind:style="{
          transform: `scale(${page.theme.canvas.deviceZoom / 100})`,
          marginLeft: `${page.theme.padding.deviceGutter / 2}px`,
          marginRight: `${page.theme.padding.deviceGutter / 2}px`
          }">
          <div class="mock"></div>
          <div class="image" >
            <img :src="image"></div>
          </div>
      </div>
    </div>
    <div id="render-area"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import html2canvas from 'html2canvas'
import download from 'downloadjs'

export default {
  name: 'HelloWorld',
  mounted () {
  },
  data () {
    return {
      zoom: 50,
      deviceZoom: 50
    }
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
            this.$store.dispatch('addImage', this.dataURItoBlob(e.target.result))
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
    },
    mousedown: function (e) {
      console.log('mouse down')
    },
    drag: function (e) {
      console.log('mouse drag', e)
    },
    saveToPng: function () {
      const now = Date.now()
      const filename = `render-${now}-${this.currentPage}.jpg`
      html2canvas(document.getElementById('render'), { allowTaint: true, scale: 1 }).then(function (canvas) {
        var data = canvas.toDataURL('image/jpeg', 0.9)
        download(data, filename, 'image/jpeg')
      })
    }
  },
  computed: {
    page: function () {
      return this.pages[this.currentPage]
    },
    ...mapGetters([
      'pages',
      'currentPage',
      'album'
    ])
  }
}
</script>

<style lang="scss" scoped>
.hello {
  padding-bottom: 30px;
}
.canvas-settings {
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: rgba(255,255,255,1);
  box-shadow: 2px 0 3px rgba(0, 0, 0, .18);
  .zoom {
    display: inline-block;
    vertical-align: middle;
    padding: 10px;
    text-align: center;
    font-size: 12px;
  }
}
.render {
  margin: 100px auto 0;
  overflow: hidden;
  text-align: center;
  font-size: 0;
  position: relative;
  .watermark {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    padding: 30px;
    text-align: right;
    &.none {
      display: none;
    }
  }
  .device {
    display: inline-block;
    position: relative;
    &:hover {
      .controls {
        opacity: 1;
      }
    }
    .controls {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      width: 100%;
      opacity: 0;
      .move {
        position: absolute;
        left: 50%;
        top: 100px;
        width: 60px;
        height: 60px;
        margin-left: -30px;
        background-image: url('~@/assets/svg/split-vertical.svg');
        background-repeat: no-repeat;
        background-size: cover;
        cursor: move;
      }
    }
    &.apple-iphone-x {
      width: 434px;
      height: 872px;
      padding-top: 26px;
      padding-right: 28px;
      padding-bottom: 29px;
      padding-left: 28px;
      overflow: hidden;
      .mock {
        width: 434px;
        height: 872px;
        position: absolute;
        background-image: url('/static/mockup/apple-iphone-x.png');
        background-size: 434px;
        left: 0;
        top: 0;
        z-index: 2;
      }
      .image {
        width: 378px;
        height: 817px;
        background-repeat: no-repeat;
        background-position: center;
        background-color: #000000;
        background-size: contain;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>
