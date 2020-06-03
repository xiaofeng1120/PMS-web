<template>
  <div class="roomVacantPage" v-show="show">
    <transition name="slide-fade">
      <div v-show="show">
        <div class="box" v-show="type==0">
          <header>
            <div>选中{{$store.state.roomList.length}}个房间</div>
            <el-button size="small" type="primary" @click="type=4">锁定房间</el-button>
          </header>
          <section>
            <div class="nav">
              <el-button size="small" type="primary">全部设为净</el-button>
              <el-button size="small" type="info">全部设为脏</el-button>
            </div>
            <ul class="setRoom">
              <li v-for="(item,index) in indexPage.room" :key="index">
                <span>{{item.roomNumber}} {{item.name}} 为净房</span>
                <div>
                  <el-button size="mini" type="primary">设为净</el-button>
                  <el-button size="mini" type="info">设为脏</el-button>
                </div>
              </li>
            </ul>
            <div class="room">
              <ul>
                <li v-for="(item,index) in indexPage.room" :key="index">
                  <h3>
                    <span>{{item.roomNumber}} {{item.name}}</span>
                    <div>
                      <el-input size="mini" v-model="item.list.length" disabled></el-input>
                      <span>晚</span>
                    </div>
                    <div>
                      ￥
                      <el-input size="mini" v-model="item.value2" disabled></el-input>
                    </div>
                  </h3>
                  <div v-for="(v,i) in item.list" :key="i">
                    <el-select size="mini" v-model="v.date">
                      <el-option
                        :label="item"
                        :value="item"
                        v-for="(item,index) in $store.state.dateList"
                        :key="index"
                      ></el-option>
                    </el-select>
                    <el-input size="mini" v-model="v.price"></el-input>
                    <i class="el-icon-remove" @click="delRoom(index,i,item.id,v.id)"></i>
                  </div>
                </li>
                <li class="total">
                  <span>
                    合计：
                    <span class="price">￥{{getPrice}}</span>
                  </span>
                </li>
              </ul>
            </div>
          </section>
          <footer>
            <span @click="showReserve">办理预定</span>
            <span @click="showInhouse(false)">办理入住</span>
            <span @click="showInhouse(true)">办理时租</span>
            <span @click="Cancel">取消</span>
          </footer>
          <!-- 锁房组件 -->
        </div>
        <!-- 办理预定 -->
        <div v-show="type==1" class="reserve">
          <header>
            <h1>
              <i class="el-icon-arrow-left" @click="type=0"></i>
              <span>预定房间</span>
            </h1>
          </header>
          <section>
            <el-collapse v-model="activeName">
              <el-collapse-item title="联系人" name="0">
                <el-form :model="reserveForm" label-width="80px" class="reserveForm">
                  <el-form-item label="姓名：">
                    <el-input size="small" v-model="reserveForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号：">
                    <el-input size="small" v-model="reserveForm.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="来源：">
                    <el-select size="small" v-model="reserveForm.source">
                      <el-option label="散客" value="0"></el-option>
                      <el-option label="常住客" value="1"></el-option>
                      <el-option label="线上客户" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="2" v-for="(item,index) in indexPage.room" :key="index">
                <template slot="title">
                  <div class="slotTitle">
                    <span>{{item.roomNumber}} {{item.name}}</span>
                    <span>{{item.list.length}}晚</span>
                    <span>￥{{item.value2}}</span>
                  </div>
                </template>
                <div class="roomFotm">
                  <div v-for="(v,i) in item.list" :key="i" class="roomlist">
                    <el-select size="small" v-model="v.date">
                      <el-option
                        :label="item"
                        :value="item"
                        v-for="(item,index) in $store.state.dateList"
                        :key="index"
                      ></el-option>
                    </el-select>
                    <el-input size="small" v-model="v.price"></el-input>
                    <i class="el-icon-remove" @click="delRoom(index,i,item.id,v.id)"></i>
                  </div>
                </div>
              </el-collapse-item>
              <h2 class="total">
                <span>
                  合计：
                  <span class="price">￥{{getPrice}}</span>
                </span>
              </h2>
              <el-collapse-item title="备注" name="1">
                <el-input type="textarea" row="5" class="mark"></el-input>
              </el-collapse-item>
            </el-collapse>
          </section>
          <footer>
            <span>完 成</span>
            <span @click="type=0">返 回</span>
          </footer>
        </div>
        <!-- 锁房页面 -->
        <div class="locking" v-show="type==4">
          <h2>锁定房间</h2>
          <section>
            <div class="header">
              <ul>
                <li v-for="(item,index) in indexPage.room" :key="index">
                  <div v-for="(v,i) of item.list" :key="i">
                    <span>{{item.roomNumber}} {{item.name}}</span>
                    <span>{{v.date}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3>锁房原因</h3>
              <el-radio-group v-model="lockingForm.radio">
                <div>
                  <el-radio :label="1">维修</el-radio>
                </div>
                <div>
                  <el-radio :label="2">装修</el-radio>
                </div>
                <div>
                  <el-radio :label="3">其他</el-radio>
                </div>
              </el-radio-group>
              <h3>备注</h3>
              <el-input type="textarea" v-model="lockingForm.textarea" :rows="5"></el-input>
            </div>
          </section>
          <div class="alertFooter">
            <ul>
              <li @click="Cancel">完 成</li>
              <li @click="type=0">取 消</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <!-- 入住组件 -->
    <In :show="showIn" :is_hour="is_hour" @closeIn="closeIn"></In>
    <Dialog :msg="msg"></Dialog>
  </div>
</template>

<script>
import In from "./in";
import Dialog from "./../popup"
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    In,
    Dialog
  },
  watch: {
    "$store.state.roomList"(val) {
      this.indexPage.room = val;
    }
  },
  data() {
    return {
      type: 0,
      is_hour:false,//打开的是否是时租房
      activeName: ["0", "1", "2"],
      indexPage: {
        room: this.$store.state.roomList
      },
      reserveForm: {
        name: "",
        phone: "",
        source: "0"
      },
      lockingForm: {
        radio: 0,
        textarea: ""
      },
      showIn: false,
      msg:''
    };
  },
  mounted() {},
  computed: {
    getPrice() {
      let price = 0,
        len = this.indexPage.room;
      for (let i = 0; i < len.length; i++) {
        price += Number(len[i].value2);
      }
      return price;
    }
  },
  methods: {
    Cancel() {
      this.$emit("closeAlert");
    },
    delRoom(index, i, id, idx) {
      //id表示日历的第几横列，idx表示第几列
      this.indexPage.room[index].list.splice(i, 1);
      if (this.indexPage.room[index].list.length == 0) {
        this.indexPage.room.splice(index, 1);
      }
      var data = {
        list: this.indexPage.room,
        index: id,
        i: idx
      };
      this.$emit("changeData", data);
      this.$store.commit("setroomListInfo", this.indexPage.room);
    },
    /* 预定页面事件 */
    showReserve() {
      this.type = 1;
    },
    showInhouse(Bool) {
      this.is_hour=Bool;
      if(this.indexPage.room.length>1){
        this.msg="只能对同一客单办理入住";
        // return this.$message.error("只能对同一客单办理入住")
        this.$store.commit("setDialog",true);
        return 
      }
      this.showIn = true;
    },
    closeIn() {
      this.showIn = false;
    }
  }
};
</script>

<style scoped lang="scss">
.roomVacantPage {
  height: 100%;
  width: 30%;
  position: fixed;
  top: 0px;
  right: 0;
  & > div {
    height: 100%;
  }
  .reserve,
  .box,
  .locking {
    position: relative;
    right: 0px;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    box-shadow: -2px 0px 11px #ccc;
    box-sizing: border-box;
  }
  .box {
    & > header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      font-size: 18px;
      padding: 0px 15px;
    }
    & > section {
      margin: 15px 0px;
      height: calc(100% - 120px);
      padding: 0px 15px;
      padding-bottom: 60px;
      overflow: auto;
      .nav {
        text-align: right;
      }
      .setRoom {
        border-top: 1px solid #ccc;
        margin: 15px 0px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          margin-top: 10px;
        }
      }
      .room {
        & > ul {
          & > li {
            &.total {
              text-align: right;
              padding: 10px 0px;
              border-bottom: 1px solid #ccc;
              .price {
                color: #e41111;
                font-weight: 700;
              }
            }
            h3 {
              display: flex;
              justify-content: space-around;
              align-items: center;
              height: 40px;
              background: #ccc;
              margin-bottom: 15px;
              border-radius: 4px;
              .el-input {
                width: 65px;
              }
              span {
                margin-left: 5px;
              }
            }
            & > div {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-bottom: 10px;
              .el-input {
                width: 80px;
                margin: 0px 3%;
              }
              .el-select {
                width: 120px;
              }
              i {
                cursor: pointer;
                font-size: 28px;
              }
            }
          }
        }
      }
    }
    & > footer {
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      height: 60px;
      width: 100%;
      background: #f5f5f5;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      padding: 10px;
      box-sizing: border-box;
      span {
        width: 23%;
        background: #5ea3ff;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
          background: #3a89f0;
        }
        &:nth-child(4) {
          background: #c58383;
          &:hover {
            background: rgb(238, 157, 157);
          }
        }
      }
    }
  }
  /*预定页面的样式*/
  .reserve {
    header {
      background: #5ea3ff;
      color: #fff;
      h1 {
        display: flex;
        align-items: center;
        height: 50px;
        font-size: 18px;
        i {
          font-size: 26px;
          margin-right: 5px;
          cursor: pointer;
        }
      }
    }
    section {
      padding: 0px 15px;
      margin: 15px 0px;
      height: calc(100% - 120px);
      padding-bottom: 60px;
      overflow: auto;
      .total {
        margin: 15px 0px;
        line-height: 40px;
        text-align: right;
        padding-right: 10px;
        border-bottom: 1px solid #ccc;
        .price {
          font-weight: 700;
          color: #e41111;
        }
      }
      .reserveForm {
        width: 80%;
        margin-top: 22px;
      }
      .roomFotm {
        margin-top: 15px;
        .roomlist {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 10px;
          .el-input {
            width: 80px;
            margin: 0px 8%;
          }
          .el-select {
            width: 120px;
          }
          i {
            cursor: pointer;
            font-size: 28px;
          }
        }
      }

      .slotTitle {
        flex: 1;
        padding-right: 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    footer {
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      height: 60px;
      width: 100%;
      background: #f5f5f5;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      padding: 10px;
      box-sizing: border-box;
      span {
        width: 45%;
        background: #5ea3ff;
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
          background: #3a89f0;
        }
        &:nth-child(4) {
          background: #c58383;
          &:hover {
            background: rgb(238, 157, 157);
          }
        }
      }
    }
  }
  .locking {
    height: 100%;
    h2 {
      height: 50px;
      line-height: 50px;
      background: #5ea3ff;
      color: #fff;
      padding: 0px 15px;
    }
    section {
      padding: 0px 15px;
      .header {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        li {
          line-height: 50px;
          div {
            display: flex;
            justify-content: space-between;
          }
        }
      }
      .el-radio-group > div {
        line-height: 30px;
      }
      h3 {
        padding: 0px;
        line-height: 40px;
      }
    }
    .alertFooter {
      position: absolute;
      bottom: 15px;
      left: 0px;
      right: 0px;
      padding: 0px 15px;
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        li {
          line-height: 40px;
          width: 48%;
          text-align: center;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
          &:nth-child(1) {
            background: #5ea3ff;
            &:hover {
              background: #3a89f0;
            }
          }
          &:nth-child(2) {
            background: #c98380;
            &:hover {
              background: rgb(243, 129, 125);
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
//遮罩层的样式
.roomVacantPage .el-drawer__wrapper {
  width: 30%;
  left: 70%;
}
.roomVacantPage .el-drawer__container {
  width: 100%;
}
.roomVacantPage .el-drawer__open .el-drawer {
  width: 100% !important;
}
.roomVacantPage .slide-fade-enter-active {
  transition: all 0.3s ease;
}
.roomVacantPage .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.roomVacantPage .slide-fade-enter,
.roomVacantPage .slide-fade-leave-to {
  transform: translateX(100%);
}
.roomVacantPage .el-drawer__body {
  padding: 0px 15px;
}
.roomVacantPage .el-collapse-item__header {
  color: #333;
  font-size: 18px;
  background: #f5f5f5;
  padding-left: 10px;
}
.roomVacantPage .el-drawer__body {
  height: 100%;
}
.roomVacantPage .el-collapse-item__content {
  padding-bottom: 5px;
}
</style>