<template>
  <div class="headerPage">
    <h1>上海 X X X X X 酒店</h1>
    <div class="search">
      <el-input size="small" placeholder="用户/手机号" suffix-icon="el-icon-search"></el-input>
    </div>
    <ul>
      <li
        v-for="(item,index) in navList"
        :key="index"
        :class="activeIndex==index?'active':''"
        @click="handleClick(index)"
      >
        <img :src="item.src" />
        <span>{{item.name}}</span>
      </li>
    </ul>
    <div class="user">
      <div id="head" @mouseenter="handleShowMenu" @click="alert" @mouseleave="handleHideMenu">
        <h2>测试用户</h2>
        <i class="el-icon-caret-bottom"></i>
        <transition>
          <ul v-show="showMenu">
            <li>
              <span>PMS</span>
              <div>
                <router-link to="/room">房间管理</router-link>
                <router-link to="/hotelsolt">酒店管理</router-link>
                <router-link to="/longguest">常住客管理</router-link>
                <router-link to="/logsolt">操作日志</router-link>
                <router-link to="/usermanagement">用户管理</router-link>
                <router-link to="/blacklist">黑名单</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
              </div>
            </li>
            <li>
              <span>PMS</span>
              <div>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
              </div>
            </li>
            <li>
              <span>PMS</span>
              <div>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
                <router-link to="/">房间管理</router-link>
              </div>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "0",
      showMenu: false,
      navList: [
        { src: require("../assets/imgs/actual.png"), name: "实时房态" },
        { src: require("../assets/imgs/dynamic.png"), name: "综合房态" },
        { src: require("../assets/imgs/order.png"), name: "订单" },
        { src: require("../assets/imgs/form.png"), name: "报表" },
        { src: require("../assets/imgs/book.png"), name: "账本" }
      ]
    };
  },
  methods: {
    handleClick(i) {
      if (this.activeIndex != i) this.activeIndex = i;

      if (i == 0) {
        return this.$router.push("/index");
      } else if (i == 1) {
        return this.$router.push("/dynamic");
      } else if (i == 2) {
        return this.$router.push("/ordersolt");
      } else if (i == 3) {
        return this.$router.push("/reportformsolt");
      } else if (i == 4) {
        return this.$router.push("/accountbook");
      }
    },
    alert(){
      this.activeIndex=-1;
    },
    handleShowMenu() {
      this.showMenu = true;
    },
    handleHideMenu() {
      this.showMenu = false;
    }
  }
};
</script>

<style scoped lang="scss">
.headerPage {
  display: flex;
  background: #5ea3ff;
  align-items: center;
  color: #fff;
  height: 60px;
  padding: 0px 20px;
  h1 {
    width: 20%;
    font-size: 24px;
  }
  .search {
    width: 12%;
    margin-right: 15px;
  }
  & > ul {
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
      &:hover,
      &.active {
        background: #3586f1;
      }
      img {
        width: 30px;
        margin-right: 8px;
      }
    }
  }
  .user {
    flex: 1;
    text-align: right;
    padding-right: 5%;
    cursor: pointer;
    #head {
      display: flex;
      align-items: center;
      position: relative;
      height: 50px;
      h2 {
        margin-right: 5px;
      }
      & > ul {
        position: absolute;
        top: 50px;
        left: -50%;
        z-index: 3;
        background: #5ea3ff;
        padding: 15px;
        border-radius: 0px 0px 6px 6px;
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          & > span {
            margin-right: 20px;
            margin-top: 5px;
          }
          div {
            display: flex;
            flex-wrap: wrap;
            a {
              padding: 5px 10px;
              color: #fff;
              font-weight: 400;
              &:hover {
                color: #f3bc59;
              }
            }
          }
        }
      }
    }
  }
}
</style>