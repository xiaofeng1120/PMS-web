<template>
  <div>
    <el-checkbox-group v-model="checkList" @change="handleChange">
      <el-checkbox label="0">上海</el-checkbox>
      <el-checkbox label="1">北京</el-checkbox>
      <el-checkbox label="2">湖北</el-checkbox>
      <el-checkbox label="3">深圳</el-checkbox>
      <el-checkbox label="4">天津</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList:[]
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(){
      console.log(this.checkList)
    }
  }
};
</script>

<style scoped lang="scss">
</style>