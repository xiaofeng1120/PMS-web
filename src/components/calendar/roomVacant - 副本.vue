<template>
  <div class="roomVacantPage">
    <el-drawer
      :visible="show"
      :with-header="false"
      :modal="false"
      :modal-append-to-body="true"
      @close="handleClose"
    >
      <h1>这里是空房的页面</h1>
    </el-drawer>
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
  methods: {
    handleClose() {
      this.$emit("closeAlert");
    }
  }
};
</script>

<style scoped lang="scss">
.roomVacantPage {
  height: 100%;
  padding: 10px;
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
.roomVacantPage .el-drawer__open .el-drawer{
    width: 100% !important;
}
</style>