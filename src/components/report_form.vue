<template>
  <div class="con">
    <div class="picker">
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
      orderMeunList: [
        { name: "经营状况" },
        { name: "运营报表" },
        { name: "订单输入报表" }
      ]
    };
  },
  methods: {
    handleClick(i) {
      if (this.activeIndex != i) this.activeIndex = i;

      if (i == 0) {
        this.$router.push("/reportformsolt/businessform");
      } else if (i == 1) {
        this.$router.push("/reportformsolt/operatingform");
      } else if (i == 2) {
        this.$router.push("/reportformsolt/orderincomeform");
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