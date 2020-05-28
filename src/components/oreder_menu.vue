<template>
  <div class="con">
      <div class="picker" v-show="isPicker">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>

    <div class="orderMenu">
      <ul>
        <li
          v-for="(item,index) in orderMeunList"
          :key="index"
          :class="activeIndex==index?'active':''"
          @click="handleClick(index)"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "0",
      date: "",
      isPicker: false,
      orderMeunList: [
        { name: "高级查询" },
        { name: "今日预到客单" },
        { name: "今日预离客单" },
        { name: "欠费客单" },
        { name: "挂退客单" },
        { name: "预定客单" },
        { name: "在住客单" },
        { name: "退房客单" }
      ]
    };
  },
  methods: {
    handleClick(i) {
      if (this.activeIndex != i){
        this.activeIndex = i;
      }

      if (i == 0) {
        this.isPicker = false;
        this.$router.push("/ordersolt/order");
      } else if (i == 1) {
        this.isPicker = false;
        this.$router.push("/ordersolt/advanceto");
      } else if (i == 2) {
        this.isPicker = false;
        this.$router.push("/ordersolt/leave");
      } else if (i == 3) {
        this.isPicker = true;
        this.$router.push("/ordersolt/owe");
      } else if (i == 4) {
        this.isPicker = false;
        this.$router.push("/ordersolt/hangback");
      } else if (i == 5) {
        this.isPicker = true;
        this.$router.push("/ordersolt/booking");
      } else if (i == 6) {
        this.isPicker = false;
        this.$router.push("/ordersolt/inlive");
      } else if (i == 7) {
        this.isPicker = true;
        this.$router.push("/ordersolt/refundroom");
      }
    }
  }
};
</script>


<style scoped lang="scss">
.con {
  width: 100%;
  height: 50px;
  background: #5eaeff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.orderMenu {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

ul {
  display: flex;
  margin: 0px 5%;
  align-items: center;
  height: 100%;

  li {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 25px;
    cursor: pointer;
    color: #ffffff;
    &:hover,
    &.active {
      background: #5ea3ff;
    }
  }
}

.picker {
  height: 40px;
  margin-top: 5px;
  padding-left: 10px;
}
</style>