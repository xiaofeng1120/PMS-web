<template>
  <div class="unlockPage">
    <el-drawer :visible="show" :with-header="false" @close="handleClose">
      <div class="content">
        <h2>
          <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
        </h2>
        <ul class="roomList">
          <li>
            <div>
              <span>{{$store.state.room.roomNumber}} {{$store.state.room.hoursType}}</span>
              <span>05月25日-05月25日</span>
              <el-button size="small" type="primary" @click="Unlock">解 锁</el-button>
            </div>
            <h4>
              <span>备注：</span>
              <span>装修</span>
            </h4>
          </li>
        </ul>
        <!-- 取消按钮 -->
        <div class="btnBox">
          <div @click="Cancel">取 消</div>
        </div>
      </div>
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
        this.$emit("closeUnlock");
    },
    Cancel(){
        this.$emit("closeUnlock");
    },
    Unlock(){
        this.$message.success("解锁成功!")
        this.$emit("closeUnlock");
    }
  }
};
</script>

<style scoped lang="scss">
.unlockPage {
  .content {
    height: 100%;
    padding: 0px 15px;
    position: relative;
    h2 {
      height: 60px;
      line-height: 60px;
    }
    .roomList {
      margin: 10px 0px;
      li {
        border: 1px solid #5ea3ff;
        border-radius: 4px;
        padding: 15px;
        line-height: 50px;
        & > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .btnBox {
      position: absolute;
      bottom: 15px;
      left: 0px;
      right: 0px;
      padding: 0px 15px;
      div {
        background: #c98380;
        width: 80%;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-radius:4px;
        cursor: pointer;
        &:hover {
          background: rgb(243, 129, 125);
        }
      }
    }
  }
}
</style>