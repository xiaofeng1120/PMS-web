<template>
  <div class="con">
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
        { name: "自动短信服务" },
        { name: "短息模板管理" }
      ]
    };
  },
  methods: {
    handleClick(i) {
      if (this.activeIndex != i) this.activeIndex = i;

      if (i == 0) {
        this.$router.push("/smssolt/autosms");
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
</style>