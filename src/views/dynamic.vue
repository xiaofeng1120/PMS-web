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
            >
              <div>{{v.user.name}}</div>
              <div>线下客人</div>
              <ul>
                <li class="item1">住</li>
                <li class="item2">预</li>
                <!-- <li class="item3">留</li>
                <li class="item4">修</li>-->
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <RoomVacant :show="ShowRoomVacant" @closeAlert="closeAlert"></RoomVacant>
  </div>
</template>

<script>
import Menu from "../components/menu";
import header from "../views/data.js";
import RoomVacant from "./../components/calendar/roomVacant"
export default {
  components: {
    Menu,
    RoomVacant
  },
  data() {
    return {
      header: header.data,
      list: header.list,
      value1: "2020-05-28",
      week: ["日", "一", "二", "三", "四", "五", "六"],
      today:'',//今天日期
      selectedRoom:[],//选中的房间
      ShowRoomVacant:false,//空房
    };
  },
  watch:{
      value1(){
        this.date();
      }
  },
  mounted(){
    this.today=this.$moment().format("MM-DD");
  },
  methods: {
    handleActive(index, i) {
      this.list[index].item[i].is_active = !this.list[index].item[i].is_active;
      var id=this.list[index].id,//点击房间的id
      price=this.list[index].item[i].price,//点击房间的价格
      date=this.header[i].day;//点击房间的日期
      if(this.list[index].item[i].is_active){
        this.selectedRoom.push({
            name:this.list[index].roomName,
            id,
            roomNumber:this.list[index].roomNumber,
            list:[{date:date,price:price}]
        })
      }else{
          this.selectedRoom.map((item,index)=>{
            if(item.id==id){//判断id  横列
              for(var i=0;i<item.list.length;i++){
                  if(item.list[i].date==date){//判断时间是否同一天 纵列
                      this.selectedRoom.splice(index,1)
                  }
              }
            }
          })
      }
      this.ShowRoomVacant=true;
      if(id==3){
        this.closeAlert()
      }
      this.$store.commit('setroomListInfo', this.selectedRoom);
    },
    handlePrve(){//上一周
        this.value1=this.getDate(-7,true)
    },
    handleNext(){//下一周
      this.value1=this.getDate(7,true)
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
    getDate(day,flag=false) {
      var dd = new Date(this.value1);
      dd.setDate(dd.getDate() + day);
      var y=dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      if(flag){
        return y+"-" + m + "-" + d;
      }else{
        return  m + "-" + d;
      }
    },
    getweek(day) {
      var dd = new Date(this.value1);
      dd.setDate(dd.getDate() + day);
      return dd.getDay();
    },
    closeAlert(){
      this.ShowRoomVacant=false;
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
      header {
        ul {
          display: flex;
          cursor: pointer;
          li {
            border: 1px solid #ccc;
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
              border-left: 1px solid #ccc;
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
        & > ul {
          display: flex;
          cursor: pointer;
          & > li {
            border: 1px solid #ccc;
            border-left: none;
            width: 130px;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
            border-top: none;
            &.frist {
              width: 180px;
              border-left: 1px solid #ccc;
              line-height: 35px;
            }

            div {
              margin-top: 8px;
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
          background: #5ea3ff;
          color: #fff;
        }
      }
    }
  }
}
</style>