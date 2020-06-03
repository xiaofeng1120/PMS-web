<template>
  <div class="dynamicPage">
    <div class="menuLeft">
      <Menu></Menu>
    </div>
    <div class="boxRight">
      <section>
        <header>
          <ul>
            <li class="frist">
              <!-- <div>2020-05</div> -->
              <div>
                <el-date-picker v-model="value1" size="mini" type="date" placeholder="选择日期"></el-date-picker>
              </div>
              <div class="btn">
                <span @click="handlePrve">
                  <i class="el-icon-arrow-left"></i>
                  <span>前一周</span>
                </span>
                <span @click="handleNext">
                  <span>后一周</span>
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
            </li>
            <li v-for="(item,index) in header" :key="index" :class="item.day==today?'on':''">
              <div>{{item.week}}</div>
              <div v-if="item.day!=today">{{item.day}}</div>
              <div v-else class="today">今天</div>
              <div>剩{{item.count}}间</div>
            </li>
          </ul>
        </header>
        <div class="main">
          <ul v-for="(item,index) in list" :key="index">
            <li class="frist">
              <div>{{item.roomName}}</div>
              <div>{{item.roomNumber}}</div>
            </li>
            <li
              v-for="(v,i) in item.item"
              :key="i"
              @click="handleActive(index,i,v)"
              :class="v.is_active?'active':''"
              class="tableBox"
            >
              <!-- 锁定 -->
              <div v-if="v.is_locking" class="locking">
                <img src="./../assets/imgs/locking.png" alt />
              </div>
              <!-- 空房 -->
              <div v-else-if="v.roomType==0" class="roomVacant">
                <div>￥{{v.price}}</div>
              </div>
              <!-- 入住 -->
              <div v-else-if="v.roomType==1" class="inhouse">
                <div>{{v.user.name}}</div>
                <div class="source">{{v.user.source}}</div>
                <ul>
                  <li class="item1">住</li>
                </ul>
              </div>
              <!-- 预定 -->
              <div v-else-if="v.roomType==2" class="reserve">
                <div>{{v.user.name}}</div>
                <div class="source">{{v.user.source}}</div>
                <ul>
                  <li class="item2">预</li>
                </ul>
              </div>
              <!-- 脏房 -->
              <div v-else-if="v.roomType==3" class="dirty">
                <div>￥{{v.price}}</div>
                <img src="./../assets/imgs/sao.png" alt />
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <RoomVacant :show="ShowRoomVacant" @closeAlert="closeAlert" @changeData="changeData"></RoomVacant>
    <Dinhouse :show="ShowInhouse" @closeInhouse="closeInhouse"></Dinhouse>
    <Locking :type="type" @closeLock="closeLock"></Locking>
    <Beforeorder :Type="type" @closeLock="closeLock"></Beforeorder>
  </div>
</template>

<script>
import Menu from "../components/menu";
import header from "../views/data.js";
import RoomVacant from "./../components/calendar/roomVacant";
import Dinhouse from "./../components/calendar/inhouse";
import Locking from "./../components/calendar/locking"
import Beforeorder from "./../components/calendar/beforeOrder"
export default {
  components: {
    Menu,
    RoomVacant,
    Dinhouse,
    Locking,
    Beforeorder
  },
  data() {
    return {
      header: header.data,
      list: header.list,
      value1: "2020-05-28",
      week: ["日", "一", "二", "三", "四", "五", "六"],
      today: "", //今天日期
      selectedRoom: [], //选中的房间
      ShowRoomVacant: false, //空房时弹窗 操作
      ShowInhouse: false,
      type:'0',//1=> 解锁 0=>不显示弹窗
    };
  },
  watch: {
    value1() {
      this.date();
    }
  },
  mounted() {
    this.today = this.$moment().format("MM-DD");
  },
  methods: {
    handleActive(index, i, v) {
      var id = this.list[index].id, //点击房间的id
        price = this.list[index].item[i].price, //点击房间的价格
        date = this.header[i].day, //点击房间的日期
        type=this.list[index].roomName,//房间的类型
        roomNumber=this.list[index].roomNumber;
      var arr = JSON.parse(JSON.stringify(v)); //不是空房时只能选择一个房间，房间信息储存起来
      arr.id = id;
      arr.price = price;
      arr.date = date;
      var obj = {
        id,date,price,type,roomNumber
      };
      if (v.roomType != 0) {
        //点击的不是空房，清除其他选定的房间，保证只能选一个
        this.selectedRoom = [];
        this.$store.commit("setroomListInfo", this.selectedRoom);
        for (let k = 0, len = this.list; k < len.length; k++) {
          for (let j = 0, leng = len[k].item; j < leng.length; j++) {
            len[k].item[j].is_active = false;
          }
        }
      }
      this.list[index].item[i].is_active = !this.list[index].item[i].is_active;
      this.ShowRoomVacant = false;
      if (v.is_locking) {
        this.$store.commit("setrooms",obj);
        this.type='1';
        console.log(this.type)
      } else if (v.roomType == 0) {
        //空房  //点击的是空房，清除其他选定的房间，保证选的都是空房
        for (let k = 0, len = this.list; k < len.length; k++) {
          for (let j = 0, leng = len[k].item; j < leng.length; j++) {
            if (leng[j].roomType != 0) {
              len[k].item[j].is_active = false;
            }
          }
        }
        if (v.is_active) {
          //选定时
          let open = true;
          this.selectedRoom.map(item => {
            if (item.id == id) {
              item.list.push({
                date: date,
                price: price,
                id: i
              });
              open = false;
            }
          });
          if (open) {
            this.selectedRoom.push({
              name: this.list[index].roomName,
              id,
              value1: "",
              value2: 0,
              roomNumber: this.list[index].roomNumber,
              list: [{ date: date, price: price, id: i }]
            });
          }
        } else {
          //取消选中时
          let open = true;
          this.selectedRoom.map((item, Index) => {
            if (item.id == id) {
              //判断id  横列
              for (var a = 0; a < item.list.length; a++) {
                if (item.list[a].date == date) {
                  //判断时间是否同一天 纵列
                  item.list.splice(a, 1);
                  if (item.list.length == 0) {
                    this.selectedRoom.splice(Index, 1);
                  }
                  open = false;
                }
              }
            }
          });
          if (open) {
            this.selectedRoom.splice(index, 1);
          }
        }
        this.$store.commit(
          "setDateList",
          this.header.map(item => {
            return item.day;
          })
        );
        this.$store.commit("setroomListInfo", this.selectedRoom);
        this.ShowRoomVacant = true;
      } else if (v.roomType == 1) {
        this.ShowInhouse = true;
        console.log("点击的房间状态是：入住");
      } else if (v.roomType == 2) {
        this.type='2'
      } else if (v.roomType == 3) {
        this.$message.info("点击的是脏房")
        console.log("点击的房间状态是：脏房");
      }
      //this.$store.commit("setroomListInfo",[]);
    },
    handlePrve() {
      //上一周
      this.value1 = this.getDate(-7, true);
    },
    handleNext() {
      //下一周
      this.value1 = this.getDate(7, true);
    },
    date() {
      this.header = [
        //  { day:this.getDate(-2), count: "8", week:this.week[this.getweek(-2)] },
        //  { day:this.getDate(-1), count: "8", week:this.week[this.getweek(-1)]},
        { day: this.getDate(0), count: "8", week: this.week[this.getweek(0)] },
        { day: this.getDate(1), count: "12", week: this.week[this.getweek(1)] },
        { day: this.getDate(2), count: "15", week: this.week[this.getweek(2)] },
        { day: this.getDate(3), count: "17", week: this.week[this.getweek(3)] },
        { day: this.getDate(4), count: "23", week: this.week[this.getweek(4)] },
        { day: this.getDate(5), count: "24", week: this.week[this.getweek(5)] },
        { day: this.getDate(6), count: "36", week: this.week[this.getweek(6)] },
        { day: this.getDate(7), count: "42", week: this.week[this.getweek(7)] },
        { day: this.getDate(8), count: "56", week: this.week[this.getweek(8)] },
        { day: this.getDate(9), count: "60", week: this.week[this.getweek(9)] }
      ];
    },
    getDate(day, flag = false) {
      var dd = new Date(this.value1);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      if (flag) {
        return y + "-" + m + "-" + d;
      } else {
        return m + "-" + d;
      }
    },
    getweek(day) {
      var dd = new Date(this.value1);
      dd.setDate(dd.getDate() + day);
      return dd.getDay();
    },
    closeAlert() {
      this.ShowRoomVacant = false;
    },
    changeData(data) {
      //子组件房间删除告诉父组件
      console.log(data);
      this.selectedRoom = data.list;
      this.list[data.index - 1].item[data.i].is_active = false;
    },
    closeInhouse() {
      this.ShowInhouse = false;
    },
    closeLock(){
      this.type="0"
    }
  }
};
</script>

<style scoped lang="scss">
.dynamicPage {
  height: calc(100% - 20px);
  display: flex;
  .menuLeft {
    width: 260px;
    min-width: 260px;
    box-shadow: 1px 1px 1px 1px #ccc;
    padding-bottom: 10px;
    margin-right: 20px;
    overflow: auto;
  }
  .boxRight {
    flex: 1;
    section {
      padding: 30px;
      height: calc(100% - 65px);
      header {
        ul {
          display: flex;
          cursor: pointer;
          li {
            border: 1px solid #aaa;
            border-left: none;
            width: 130px;
            text-align: center;
            padding: 10px;
            line-height: 25px;
            box-sizing: border-box;
            background: #f5f5f5;
            &.on {
              background: #5ea3ff;
              color: #fff;
            }
            .today {
              font-size: 14px;
            }
            &.frist {
              width: 180px;
              border-left: 1px solid #aaa;
              line-height: 35px;
              .el-date-editor {
                width: 130px;
              }
              .btn {
                display: flex;
                align-items: center;
                & > span {
                  display: flex;
                  align-items: center;
                  width: 50%;
                  font-size: 14px;
                  &:last-child {
                    justify-content: flex-end;
                  }
                  i {
                    font-size: 16px;
                  }
                  &:hover {
                    color: #5ea3ff;
                  }
                }
              }
            }
          }
        }
      }
      .main {
        height: calc(100% - 100px);
        overflow: auto;
        & > ul {
          display: flex;
          cursor: pointer;
          & > li {
            border: 1px solid #aaa;
            border-left: none;
            width: 130px;
            text-align: center;
            border-top: none;
            box-sizing: border-box;
            &.tableBox > div {
              box-sizing: border-box;
              padding: 5px;
              height: 100%;
              div {
                margin-top: 8px;
              }
            }
            .dirty {
              //脏房
              background: #ccc;
              position: relative;
              img {
                position: absolute;
                width: 32px;
                height: 32px;
                top: 1px;
                right: 1px;
              }
            }
            .locking,
            .roomVacant,
            .dirty {
              //锁定 空房 脏房
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .inhouse {
              //住房的样式
              background: #c9cef8;
              .source {
                font-size: 12px;
                color: #666;
              }
            }
            .reserve {
              //预定
              background: #d8e8ff;
            }
            &.frist {
              width: 180px;
              box-sizing: border-box;
              border-left: 1px solid #ccc;
              line-height: 50px;
            }

            ul {
              margin-top: 8px;
              display: flex;
              justify-content: flex-end;
              li {
                margin-left: 5px;
                font-size: 14px;
                padding: 2px 6px;
                color: #fff;
                border-radius: 4px;
                &.item1 {
                  background: #f5af19;
                }
                &.item2 {
                  background: #06c8f8;
                }
                &.item3 {
                  background: #9ff59f;
                }
                &.item4 {
                  background: #cfcdca;
                }
              }
            }
          }
        }
        .active {
          & > div {
            background: #5ea3ff !important;
            color: #fff;
            .source {
              color: #fff !important;
            }
          }
        }
      }
    }
  }
}
</style>