<template>
  <!--全局弹窗  -->
  <div>
    <el-dialog title="提示" :append-to-body="true" :visible.sync="$store.state.dialogVisible" width="30%" :before-close="cancel">
      <span>{{msg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "确认关闭吗"
    },
  },
  data() {
    return {
        
    };
  },
  created() {},
  mounted() {},
  methods: {
      cancel(){
          this.$store.commit("setDialog",false);
      }
  }
};
</script>

<style scoped lang="scss">
</style>