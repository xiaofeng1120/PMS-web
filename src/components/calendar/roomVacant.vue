<template>
  <div class="roomVacantPage">
    <transition name="slide-fade">
      <div class="box" v-show="show">
        <h1>这里是空房的页面</h1>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.roomVacantPage {
  height: 100%;
  width: 100%;
  position: relative;
  .box {
    position: fixed;
    right: 0px;
    width: 30%;
    height: 100%;
    background: #ccc;
  }
}
</style>
<style lang="scss">
//遮罩层的样式
.roomVacantPage .el-drawer__wrapper {
  width: 30%;
  left: 70%;
}
.roomVacantPage .el-drawer__container {
  width: 100%;
}
.roomVacantPage .el-drawer__open .el-drawer {
  width: 100% !important;
}
.roomVacantPage .slide-fade-enter-active {
  transition: all 0.3s ease;
}
.roomVacantPage .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.roomVacantPage .slide-fade-enter,
.roomVacantPage .slide-fade-leave-to {
  transform: translateX(100%);
}
</style>