<template>
  <div class="indexPage">
    <div class="menuLeft">
      <Menu></Menu>
    </div>
    <div class="boxRight">
      <h1 class="time">当前营业日 ： {{date}}</h1>
      <ul class="colorTips">
        <li v-for="(item,index) of colorList" :key="index">
          <span :style="{'background':item.color}"></span>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <!-- 房间列表 -->
      <section>
        <ul class="roomBox">
          <li v-for="(item,index) in hoursList" :key="index">
            <h3>{{item.name}}</h3>
            <ul class="room">
              <li
                v-for="(v,i) in item.list"
                :key="i"
                @click="hoursInfo(v,item.name)"
                :class="v.roomStatus=='空房'?'roomNull'
                      :v.roomStatus=='预定'?'reserve'
                      :v.roomStatus=='在住'?'inHouse'
                      :v.roomStatus=='脏房'?'dirty':'locking'"
              >
                <div>{{v.roomNumber}}</div>
                <div>{{v.roomStatus}}</div>
                <div class="is_locking" v-show="v.is_locking=='1'">
                  <img src="../assets/imgs/locking.png" alt />
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <!-- 弹窗 -->
        <Alert :is_show="isShow" ref="alerts" @closeAlert="closeAlert"></Alert>
        <Unlock :show="showUnlock" ref="unlock" @closeUnlock="closeUnlock"></Unlock>
        <inHouse :show="showInHouse" ref="InHouse" @closeInhouse="closeInhouse"></inHouse>
        <Reserve :show="showReserve" ref="Reserve" @closeReserve="closeReserve"></Reserve>
      </section>
    </div>
  </div>
</template>

<script>
import Menu from "../components/menu";
import Alert from "../components/alert";
import Unlock from "../components/unlock";
import inHouse from "./../components/inHouse";
import Reserve from "./../components/reserve";
export default {
  components: {
    Menu,
    Alert,
    Unlock,
    inHouse,
    Reserve
  },
  data() {
    return {
      date: "2020年05月27日",
      isShow: false, //预定 快速入住
      showUnlock: false, //解锁的弹窗
      showInHouse: false, //在住弹窗
      showReserve: false, //预定弹窗
      colorList: [
        { name: "空房", color: "#97a3fb" },
        { name: "预定", color: "#97cffe" },
        { name: "在住", color: "#97a3fb" },
        { name: "脏房", color: "#ffa897" }
      ],
      hoursList: [
        {
          name: "单人间",
          list: [
            { id: 1, roomNumber: "101", roomStatus: "空房", is_locking: 0 },
            { id: 2, roomNumber: "102", roomStatus: "锁定", is_locking: 1 },
            { id: 3, roomNumber: "103", roomStatus: "预定", is_locking: 0 },
            { id: 4, roomNumber: "104", roomStatus: "在住", is_locking: 0 },
            { id: 5, roomNumber: "105", roomStatus: "空房", is_locking: 0 },
            { id: 6, roomNumber: "106", roomStatus: "脏房", is_locking: 0 },
            { id: 7, roomNumber: "107", roomStatus: "在住", is_locking: 0 }
          ]
        },
        {
          name: "标准间",
          list: [
            { id: 1, roomNumber: "201", roomStatus: "空房", is_locking: 0 },
            { id: 2, roomNumber: "202", roomStatus: "预定", is_locking: 0 },
            { id: 3, roomNumber: "203", roomStatus: "预定", is_locking: 0 },
            { id: 4, roomNumber: "204", roomStatus: "在住", is_locking: 0 },
            { id: 5, roomNumber: "205", roomStatus: "空房", is_locking: 0 },
            { id: 6, roomNumber: "206", roomStatus: "脏房", is_locking: 0 },
            { id: 7, roomNumber: "207", roomStatus: "在住", is_locking: 0 }
          ]
        },
        {
          name: "豪华房",
          list: [
            { id: 1, roomNumber: "301", roomStatus: "空房", is_locking: 0 },
            { id: 2, roomNumber: "302", roomStatus: "预定", is_locking: 0 },
            { id: 3, roomNumber: "303", roomStatus: "预定", is_locking: 0 },
            { id: 4, roomNumber: "304", roomStatus: "在住", is_locking: 0 },
            { id: 5, roomNumber: "305", roomStatus: "空房", is_locking: 0 },
            { id: 6, roomNumber: "306", roomStatus: "脏房", is_locking: 0 },
            { id: 7, roomNumber: "307", roomStatus: "在住", is_locking: 0 }
          ]
        },
        {
          name: "商务房",
          list: [
            { id: 1, roomNumber: "401", roomStatus: "空房", is_locking: 0 },
            { id: 2, roomNumber: "402", roomStatus: "预定", is_locking: 0 },
            { id: 3, roomNumber: "403", roomStatus: "预定", is_locking: 0 },
            { id: 4, roomNumber: "404", roomStatus: "在住", is_locking: 0 },
            { id: 5, roomNumber: "405", roomStatus: "空房", is_locking: 0 },
            { id: 6, roomNumber: "406", roomStatus: "脏房", is_locking: 0 },
            { id: 7, roomNumber: "407", roomStatus: "在住", is_locking: 0 }
          ]
        },
        {
          name: "总统套",
          list: [
            { id: 1, roomNumber: "601", roomStatus: "空房", is_locking: 0 },
            { id: 2, roomNumber: "602", roomStatus: "预定", is_locking: 0 },
            { id: 3, roomNumber: "603", roomStatus: "预定", is_locking: 0 },
            { id: 4, roomNumber: "604", roomStatus: "在住", is_locking: 0 },
            { id: 5, roomNumber: "605", roomStatus: "空房", is_locking: 0 },
            { id: 6, roomNumber: "606", roomStatus: "脏房", is_locking: 0 },
            { id: 7, roomNumber: "607", roomStatus: "在住", is_locking: 0 }
          ]
        }
      ]
    };
  },
  created() {
     this.date = this.$moment(this.$store.state.date).format("YYYY[年]MM[月]DD[日]");
  },
  mounted() {},
  methods: {
    hoursInfo(v, type) {
      v.hoursType = type; //房间类型储存近vuex
      this.$store.commit("setRoomInfo", v);
      if (v.is_locking == 1) {
        //房间状态是锁定情形下
        return (this.showUnlock = true);
      } else if (v.roomStatus == "在住" || v.roomStatus == "脏房") {
        return (this.showInHouse = true);
      } else if (v.roomStatus == "空房") {
        return (this.isShow = true);
      } else if (v.roomStatus == "预定") {
        return (this.showReserve = true);
      }
    },
    closeAlert() {
      this.isShow = false;
    },
    closeUnlock() {
      this.showUnlock = false;
    },
    closeInhouse() {
      this.showInHouse = false;
    },
    closeReserve() {
      this.showReserve = false;
    }
  }
};
</script>

<style scoped lang="scss">
.indexPage {
  height: calc(100% - 20px);
  display: flex;
  .menuLeft {
    width: 260px;
    box-shadow: 1px 1px 1px 1px #ccc;
    padding-bottom: 10px;
    margin-right: 20px;
    overflow: auto;
  }
  .boxRight {
    flex: 1;
    .time {
      line-height: 60px;
      text-align: center;
      font-size: 28px;
      width: 50%;
      border-bottom: 1px solid #5ea3ff;
      margin: 10px auto;
      font-weight: 700;
      color: #5ea3ff;
    }
    .colorTips {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 20px 0px;
      padding-right: 15px;
      li {
        align-items: center;
        display: flex;
        color: #333;
        font-size: 12px;
        span:nth-child(1) {
          width: 16px;
          height: 16px;
          display: inline-block;
          margin: 0px 5px 0px 20px;
        }
      }
    }
    section {
      text-align: left;
      height: calc(100% - 150px);
      overflow-y: auto;
      padding: 10px 0px;
      .roomBox > li {
        margin-bottom: 50px;
      }
      h3 {
        font-size: 20px;
        color: #000;
        &::before {
          content: "";
          border: 3px solid #5ea3ff;
          height: 100%;
          margin-right: 15px;
        }
      }
      .room {
        display: flex;
        flex-wrap: wrap;
        li {
          border-radius: 8px;
          cursor: pointer;
          height: 90px;
          width: 14%;
          margin-right: 2.5%;
          margin-top: 25px;
          position: relative;
          .is_locking {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            background: rgba(88, 88, 88, 0.8);
            text-align: right;
            padding: 5px 5px 0px 0px;
            box-sizing: border-box;
            img {
              width: 30px;
            }
          }
          div:nth-child(1) {
            line-height: 40px;
            padding: 0px 15px;
            font-size: 26px;
            font-weight: 700;
          }
          div:nth-child(2) {
            line-height: 40px;
            text-align: center;
          }
          &.roomNull {
            //空房样式
            background: #d7e8ff;
          }
          &.reserve {
            //预定样式
            background: #97cffe;
          }
          &.inHouse {
            //在住
            background: #97a3fb;
          }
          &.dirty {
            //脏房
            background: #ffa897;
          }
        }
      }
    }
  }
}
</style>