<template>
    <div class="alertHaederPage">
        <header>
          <h2>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</h2>
          <div>
            <el-button size="small" type="primary">查看联房</el-button>
            <el-button size="small" type="primary">打印票据</el-button>
            <i class="el-icon-s-flag"></i>
            <i class="el-icon-mobile-phone"></i>
          </div>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created(){},
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="scss">
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    h2 {
      font-size: 18px;
    }
    div {
      display: flex;
      align-items: center;
      span,
      i {
        margin-left: 10px;
      }
      i {
        font-size: 22px;
        color: #5ea3ff;
        cursor: pointer;
        margin-left: 15px;
      }
    }
  }
</style>