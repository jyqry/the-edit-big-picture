<template>
  <div class="page-setting" v-if="page">
    <div class="title">
      캔버스
    </div>
    <div class="item">
      <div>
        크기 <input type="number" v-model="canvasWidth"> * <input type="number" v-model="canvasHeight">
      </div>
      <div>
        상단여백 <input type="number" @change="update" v-model="page.theme.padding.canvasTop"> px
      </div>
      <div>
        <input type="range" @change.passive="update" min="-500" max="500" v-model="page.theme.padding.canvasTop" style="width: 100%;">
      </div>
      <div>
        좌측여백 <input type="number" @change="update" v-model="page.theme.padding.canvasLeft"> px
      </div>
      <div>
        <input type="range" @change.passive="update" min="-500" max="500" v-model="page.theme.padding.canvasLeft" style="width: 100%;">
      </div>
    </div>

    <div class="title">
      디바이스
    </div>
    <div class="item">
      <div class="device apple-iphone-x" v-bind:class="{ active: page.theme.device === 'apple-iphone-x' }" @click="page.theme.device = 'apple-iphone-x'">
        iphone x
      </div>
      <div>
        간격 <input type="number" @change="update" v-model="page.theme.padding.deviceGutter"> px
      </div>
      <div>
        <input type="range" @change.passive="update" min="-200" max="200" v-model="page.theme.padding.deviceGutter" style="width: 100%;">
      </div>
      <div>
        크기 <input type="number" @change="update" v-model="page.theme.canvas.deviceZoom">%
      </div>
      <div>
        <input type="range" @change.passive="update" min="10" max="200" v-model="page.theme.canvas.deviceZoom" style="width: 100%;">
      </div>
    </div>

    <div class="title">
      배경색
    </div>
    <div class="item">
      <div class="background-color" v-bind:style="{ backgroundColor: page.theme.backgroundColor }" @click="backgroundColorToggle = !backgroundColorToggle"></div>
      <div class="picker" v-show="backgroundColorToggle">
        <chrome-picker :value="page.theme.backgroundColor" @input="updateBackgroundColor"></chrome-picker>
        <button class="button" @click="backgroundColorToggle = false">닫기</button>
      </div>
    </div>

    <div class="title">
      워터마크
    </div>
    <div class="item">
      <span style="cursor: pointer" @click="changeWatermark('none')"><span v-show="page.theme.watermark === 'none'">✔</span>없음</span>
      <span style="cursor: pointer" @click="changeWatermark('gray')"><span v-show="page.theme.watermark === 'gray'">✔</span>그레이</span>
      <span style="cursor: pointer" @click="changeWatermark('white')"><span v-show="page.theme.watermark === 'white'">✔</span>화이트</span>
    </div>

    <div class="title">
      배경이미지
    </div>
    <div class="item bgimg">
      <div class="background-color" v-bind:style="{ backgroundImage: `url('${page.theme.backgroundImage}')` }" @click="$refs.bgimg.click()"></div>
      <div class="remove" @click="removeBackgroundImage"></div>
      <input class="hide" type="file" ref="bgimg" @change="updateBackgroundImage($event)">
    </div>

    <div class="title">
      스크린샷
    </div>
    <div id="album">
      <div class="image" v-for="(image, index) in page.images" :key="index">
        <img :src="image">
        <div class="remove" @click="removeImage(index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Chrome } from 'vue-color'

export default {
  mounted () {
    this.getTheme()
  },
  components: {
    'chrome-picker': Chrome
  },
  data () {
    return {
      isLoaded: false,
      page: null,
      backgroundColorToggle: false,
      canvasWidth: 0,
      canvasHeight: 0
    }
  },
  methods: {
    removeImage: function (index) {
      this.$store.dispatch('removeImage', index)
    },
    getTheme: function () {
      this.page = JSON.parse(JSON.stringify(this.pages[this.currentPage]))
      this.isLoaded = true
      this.canvasWidth = this.page.theme.canvas.width
      this.canvasHeight = this.page.theme.canvas.height
    },
    updateBackgroundColor: function (val) {
      this.page.theme.backgroundColor = `rgba(${val.rgba.r}, ${val.rgba.g}, ${val.rgba.b}, ${val.rgba.a})`
      this.update()
    },
    updateBackgroundImage: function (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.page.theme.backgroundImage = this.dataURItoBlob(e.target.result)
          this.update()
        }
        reader.readAsDataURL(input.files[0])
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
    removeBackgroundImage: function () {
      this.$refs.bgimg.value = ''
      this.page.theme.backgroundImage = ''
      this.update()
    },
    changeWatermark: function (string) {
      this.page.theme.watermark = string
      this.update()
    },
    update: function () {
      this.$store.dispatch('setTheme', JSON.parse(JSON.stringify(this.page)))
    }
  },
  computed: {
    ...mapGetters([
      'pages',
      'currentPage'
    ])
  },
  watch: {
    'currentPage': function () {
      this.getTheme()
    },
    canvasWidth: function () {
      this.page.theme.canvas.width = this.canvasWidth
      this.update()
    },
    canvasHeight: function () {
      this.page.theme.canvas.height = this.canvasHeight
      this.update()
    },
    pages: function () {
      this.getTheme()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-setting {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  padding-top: 70px;
  padding-left: 16px;
  padding-right: 16px;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  box-shadow: 2px 0 3px rgba(0, 0, 0, .18);
  z-index: 100;
  .title {
    padding-top:24px;
    padding-bottom: 8px;
    font-size: 12px;
    font-weight: 700;
  }
  .item {
    position: relative;
    font-size: 13px;
  }
  .background-color {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    background-color: #eee;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 2px solid #eee;
  }
  .remove {
    opacity: 0;
    position: absolute;
    top: 3px;
    left: 40px;
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
  .bgimg {
    &:hover {
      .remove {
        opacity: 1;
      }
    }
  }
  .picker {
    position: absolute;
    top: 52px;
    left: -6px;
    width: 225px;
    z-index: 1;
  }
  input {
    width: 70px;
    margin-bottom: 5px;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #000000;
    padding: 0 10px;
  }
  .device {
    display: inline-block;
    width: 110px;
    height: 48px;
    line-height: 48px;
    border-radius: 10px;
    background-color: #fff;
    border: solid 1px #eee;
    text-align: center;
    &.active {
      border: solid 5px #eeee;
      line-height: 38px;
    }
  }
  #album {
    .image {
      position: relative;
      width: 100px;
      height: 100px;
      float: left;
      text-align: center;
      margin: 0 8px 8px 0;
      background-color: #eee;
      border-radius: 5px;
      overflow: hidden;
      &:nth-child(2n) {
        margin-right: 0;
      }
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
}
</style>
