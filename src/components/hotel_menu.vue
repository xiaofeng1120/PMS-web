<template>
  <div class="con">
    <div class="orderMenu">
      <ul>
        <li
          v-for="(item,index) in hotelrMeunList"
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
      hotelrMeunList: [
        { name: "消费管理" },
        { name: "支付方式" },
        { name: "收入项目管理" },
        { name: "支出项目管理" },
        { name: "功能配置" },
        { name: "时租房配置" },
      ]
    };
  },
  methods: {
    handleClick(i) {
      if (this.activeIndex != i){
        this.activeIndex = i;
      }

      if (i == 0) {
        this.$router.push("/hotelsolt/consumption");
      } else if (i == 1) {
        this.$router.push("/hotelsolt/payment");
      } else if (i == 2) {
        this.$router.push("/hotelsolt/income");
      } else if (i == 3) {
         this.$router.push("/hotelsolt/spending");
      } else if (i == 4) {
        this.$router.push("/hotelsolt/hotelconfig");
      } else if (i == 5) {
         this.$router.push("/hotelsolt/rentroom");
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