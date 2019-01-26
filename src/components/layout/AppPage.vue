<template>
  <div class="app-page" v-if="pages">
    <div class="title">BIGPICTURE</div>
    <div class="add-page" @click="addPage"></div>
    <div class="pages">
      <div class="page" v-for="(page, index) in pages" v-bind:class="{ active: index === currentPage }" :key="index" @click="setCurrentPage(index)">
        <div class="thumb" v-bind:style="{ backgroundColor: page.theme.backgroundColor, backgroundImage: `url('${page.theme.backgroundImage}')` }"></div>
        <div class="index" v-text="index"></div>
        <div class="remove" @click="remove(index)" v-if="index !== 0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    addPage: function () {
      this.$store.dispatch('addNewPage')
    },
    setCurrentPage: function (index) {
      this.$store.dispatch('setCurrentPage', index)
    },
    remove: function (index) {
      this.$store.dispatch('removePage', index)
    }
  },
  computed: {
    ...mapGetters([
      'pages',
      'currentPage'
    ])
  }
}
</script>

<style lang="scss" scoped>
.app-page {
  position: fixed;
  width: 100%;
  min-height: 70px;
  background-color: #ffffff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .18);
  overflow: hidden;
  z-index: 1000;
  .title {
    position: absolute;
    left: 16px;
    top: 0;
    width: 120px;
    height: 70px;
    background-image: url('~@/assets/logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    text-indent: -9999px;
    z-index: 1;
  }
  .add-page {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 70px;
    background-color: #ffffff;
    background-image: url('~@/assets/svg/simple-add.svg');
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
  .pages {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    padding-bottom: 20px;
    padding-left: 150px;
    padding-right: 70px;
    overflow-x: auto;
    overflow-y: hidden;
    text-align: center;
    font-size: 0;
    white-space: nowrap;
    .page {
      position: relative;
      display: inline-block;
      width: 70px;
      height: 70px;
      padding-top: 6px;
      background-color: #ffffff;
      margin-left: 6px;
      margin-right: 6px;
      .thumb {
        width: 100%;
        height: 40px;
        border-radius: 6px;
        opacity: .7;
        border: 1px solid #eeeeee;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .index {
        font-size: 12px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
      }
      .remove {
        opacity: 0;
        position: absolute;
        top: 3px;
        right: -4px;
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
      &.active {
        .thumb {
          border: 2px solid #e6e6e6;
          opacity: 1;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .index {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
